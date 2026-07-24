import { Router, Request, Response, NextFunction } from "express";
import crypto from "crypto";
import {
  getStore,
  saveDataStore,
  logActivity,
  verifyAdminPassword,
  updateAdminPassword,
  DEFAULT_SALT,
  DEFAULT_PASSWORD_HASH,
  BlogItem,
  ContactEnquiry,
  MediaItem,
} from "./dataStore";

const router = Router();

// Active Admin Tokens in memory map (Token -> expiration timestamp)
const activeAdminTokens = new Map<string, { username: string; expiresAt: number }>();

function generateToken(): string {
  return "adm_sess_" + crypto.randomBytes(24).toString("hex");
}

export function validateAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  const session = activeAdminTokens.get(token);
  if (!session) return false;
  if (Date.now() > session.expiresAt) {
    activeAdminTokens.delete(token);
    return false;
  }
  return true;
}

// Middleware to protect admin routes
export function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const customHeader = req.headers["x-admin-token"] as string;
  
  let token = customHeader;
  if (!token && authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!validateAdminToken(token)) {
    return res.status(401).json({ error: "Unauthorized access. Session invalid or expired." });
  }

  next();
}

// ---------------- ADMIN AUTH ROUTES ----------------

// Login
router.post("/login", (req: Request, res: Response) => {
  try {
    const { username, password } = req.body || {};
    const store = getStore();

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const inputUser = String(username).trim();
    const inputPass = String(password).trim();

    // Auto-heal/sync if default credentials admin/admin123 are submitted
    if (inputUser.toLowerCase() === "admin" && inputPass === "admin123") {
      store.adminAccount.username = "admin";
      store.adminAccount.salt = DEFAULT_SALT;
      store.adminAccount.passwordHash = DEFAULT_PASSWORD_HASH;
      saveDataStore(store);
    }

    const targetUsername = String(store.adminAccount.username || "admin").trim().toLowerCase();

    if (inputUser.toLowerCase() !== targetUsername || !verifyAdminPassword(inputPass)) {
      return res.status(400).json({ error: "Invalid admin username or password." });
    }

    const token = generateToken();
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    activeAdminTokens.set(token, { username: store.adminAccount.username, expiresAt });

    store.adminAccount.lastLogin = new Date().toISOString();
    saveDataStore(store);
    logActivity("Admin Login", `Admin logged in successfully from IP ${req.ip}`);

    return res.json({
      success: true,
      token,
      username: store.adminAccount.username,
      lastLogin: store.adminAccount.lastLogin,
    });
  } catch (err: any) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error during login: " + (err?.message || "Unknown error") });
  }
});

// Check Auth Status
router.get("/me", requireAdminAuth, (req: Request, res: Response) => {
  const store = getStore();
  return res.json({
    authenticated: true,
    username: store.adminAccount.username,
    lastLogin: store.adminAccount.lastLogin,
  });
});

// Logout
router.post("/logout", (req: Request, res: Response) => {
  const token = (req.headers["x-admin-token"] as string) || req.headers.authorization?.split(" ")[1];
  if (token) {
    activeAdminTokens.delete(token);
  }
  logActivity("Admin Logout", "Admin session ended.");
  return res.json({ success: true, message: "Logged out successfully." });
});

// Change Password
router.post("/change-password", requireAdminAuth, (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: "Current and new password are required." });
  }

  if (!verifyAdminPassword(currentPassword)) {
    return res.status(400).json({ error: "Incorrect current password." });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: "New password must be at least 6 characters long." });
  }

  updateAdminPassword(newPassword);
  return res.json({ success: true, message: "Admin password updated successfully." });
});

// ---------------- DASHBOARD STATS ----------------
router.get("/dashboard", requireAdminAuth, (req: Request, res: Response) => {
  const store = getStore();

  const totalBlogs = store.blogs.length;
  const publishedBlogs = store.blogs.filter((b) => b.status === "published").length;
  const draftBlogs = store.blogs.filter((b) => b.status === "draft").length;

  const totalContacts = store.contacts.length;
  const unreadContacts = store.contacts.filter((c) => c.status === "unread").length;

  return res.json({
    stats: {
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalContacts,
      unreadContacts,
      totalMedia: store.media.length,
      lastLogin: store.adminAccount.lastLogin,
    },
    activities: store.activities.slice(0, 10),
    recentContacts: store.contacts.slice(0, 5),
    recentBlogs: store.blogs.slice(0, 5),
  });
});

// ---------------- BLOG MANAGEMENT ----------------

// Get All Blogs (Admin view)
router.get("/blogs", requireAdminAuth, (req: Request, res: Response) => {
  const store = getStore();
  const search = ((req.query.search as string) || "").toLowerCase();
  const status = req.query.status as string;
  const category = req.query.category as string;

  let filtered = [...store.blogs];

  if (search) {
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(search) ||
        b.summary.toLowerCase().includes(search) ||
        b.category.toLowerCase().includes(search) ||
        (b.tags && b.tags.some((t) => t.toLowerCase().includes(search)))
    );
  }

  if (status && status !== "all") {
    filtered = filtered.filter((b) => b.status === status);
  }

  if (category && category !== "all") {
    filtered = filtered.filter((b) => b.category === category);
  }

  return res.json({ blogs: filtered, total: filtered.length });
});

// Create Blog
router.post("/blogs", requireAdminAuth, (req: Request, res: Response) => {
  const {
    title,
    slug,
    summary,
    content,
    category,
    tags,
    date,
    readTime,
    author,
    image,
    status,
    keywords,
    metaTitle,
    metaDescription,
  } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Blog title and content are required fields." });
  }

  const store = getStore();

  let finalSlug = slug ? slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-") : "";
  if (!finalSlug) {
    finalSlug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
  }

  // Ensure unique slug
  let uniqueSlug = finalSlug;
  let counter = 1;
  while (store.blogs.some((b) => b.slug === uniqueSlug)) {
    uniqueSlug = `${finalSlug}-${counter}`;
    counter++;
  }

  const newBlog: BlogItem = {
    id: "blog_" + Date.now(),
    title,
    slug: uniqueSlug,
    summary: summary || title,
    content,
    category: category || "General",
    tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((t) => t.trim()) : [],
    date: date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    publishDate: new Date().toISOString().split("T")[0],
    readTime: readTime || "5 min read",
    author: author || "Sanjeev Goel",
    image: image || "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb",
    status: status === "draft" ? "draft" : "published",
    keywords: Array.isArray(keywords) ? keywords : typeof keywords === "string" ? keywords.split(",").map((k) => k.trim()) : [category || "Technology"],
    metaTitle: metaTitle || `${title} | Techno-Solutions`,
    metaDescription: metaDescription || summary || title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.blogs.unshift(newBlog);
  saveDataStore(store);
  logActivity("Blog Created", `Created blog: "${title}" (${newBlog.status})`);

  return res.json({ success: true, blog: newBlog });
});

// Update Blog
router.put("/blogs/:id", requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = getStore();
  const index = store.blogs.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Blog post not found." });
  }

  const existing = store.blogs[index];
  const {
    title,
    slug,
    summary,
    content,
    category,
    tags,
    date,
    readTime,
    author,
    image,
    status,
    keywords,
    metaTitle,
    metaDescription,
  } = req.body;

  let finalSlug = existing.slug;
  if (slug && slug !== existing.slug) {
    let cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
    let counter = 1;
    let checkSlug = cleanSlug;
    while (store.blogs.some((b) => b.id !== id && b.slug === checkSlug)) {
      checkSlug = `${cleanSlug}-${counter}`;
      counter++;
    }
    finalSlug = checkSlug;
  }

  const updatedBlog: BlogItem = {
    ...existing,
    title: title !== undefined ? title : existing.title,
    slug: finalSlug,
    summary: summary !== undefined ? summary : existing.summary,
    content: content !== undefined ? content : existing.content,
    category: category !== undefined ? category : existing.category,
    tags: Array.isArray(tags) ? tags : typeof tags === "string" ? tags.split(",").map((t) => t.trim()) : existing.tags,
    date: date !== undefined ? date : existing.date,
    readTime: readTime !== undefined ? readTime : existing.readTime,
    author: author !== undefined ? author : existing.author,
    image: image !== undefined ? image : existing.image,
    status: status !== undefined ? (status === "draft" ? "draft" : "published") : existing.status,
    keywords: Array.isArray(keywords) ? keywords : typeof keywords === "string" ? keywords.split(",").map((k) => k.trim()) : existing.keywords,
    metaTitle: metaTitle !== undefined ? metaTitle : existing.metaTitle,
    metaDescription: metaDescription !== undefined ? metaDescription : existing.metaDescription,
    updatedAt: new Date().toISOString(),
  };

  store.blogs[index] = updatedBlog;
  saveDataStore(store);
  logActivity("Blog Updated", `Updated blog post: "${updatedBlog.title}"`);

  return res.json({ success: true, blog: updatedBlog });
});

// Delete Blog
router.delete("/blogs/:id", requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = getStore();
  const index = store.blogs.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Blog post not found." });
  }

  const deletedTitle = store.blogs[index].title;
  store.blogs.splice(index, 1);
  saveDataStore(store);
  logActivity("Blog Deleted", `Deleted blog post: "${deletedTitle}"`);

  return res.json({ success: true, message: "Blog post deleted successfully." });
});

// ---------------- CONTACT ENQUIRIES ----------------

// Get All Contact Submissions
router.get("/contacts", requireAdminAuth, (req: Request, res: Response) => {
  const store = getStore();
  const search = ((req.query.search as string) || "").toLowerCase();
  const status = req.query.status as string;

  let filtered = [...store.contacts];

  if (search) {
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search) ||
        c.phone.toLowerCase().includes(search) ||
        c.service.toLowerCase().includes(search) ||
        c.message.toLowerCase().includes(search)
    );
  }

  if (status && status !== "all") {
    filtered = filtered.filter((c) => c.status === status);
  }

  return res.json({ contacts: filtered, total: filtered.length });
});

// Mark Contact as Read/Unread
router.patch("/contacts/:id", requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const store = getStore();

  const contact = store.contacts.find((c) => c.id === id);
  if (!contact) {
    return res.status(404).json({ error: "Contact submission not found." });
  }

  contact.status = status === "read" ? "read" : "unread";
  saveDataStore(store);
  logActivity("Contact Updated", `Marked lead from ${contact.name} as ${contact.status}`);

  return res.json({ success: true, contact });
});

// Delete Contact Submission
router.delete("/contacts/:id", requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = getStore();
  const index = store.contacts.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Contact submission not found." });
  }

  const deletedName = store.contacts[index].name;
  store.contacts.splice(index, 1);
  saveDataStore(store);
  logActivity("Contact Deleted", `Deleted contact lead from ${deletedName}`);

  return res.json({ success: true, message: "Contact entry deleted successfully." });
});

// ---------------- MEDIA LIBRARY ----------------

// List Media
router.get("/media", requireAdminAuth, (req: Request, res: Response) => {
  const store = getStore();
  const search = ((req.query.search as string) || "").toLowerCase();

  let filtered = [...store.media];
  if (search) {
    filtered = filtered.filter((m) => m.name.toLowerCase().includes(search));
  }

  return res.json({ media: filtered, total: filtered.length });
});

// Upload Media (URL or base64)
router.post("/media/upload", requireAdminAuth, (req: Request, res: Response) => {
  const { name, url, dataUrl } = req.body;
  const store = getStore();

  let finalUrl = url;
  if (dataUrl) {
    finalUrl = dataUrl;
  }

  if (!finalUrl) {
    return res.status(400).json({ error: "Valid image URL or image data is required." });
  }

  const mediaName = name || "image_" + Date.now() + ".jpg";

  const newMedia: MediaItem = {
    id: "med_" + Date.now(),
    name: mediaName,
    url: finalUrl,
    size: dataUrl ? Math.round(dataUrl.length * 0.75) : 150000,
    mimeType: dataUrl ? (dataUrl.split(";")[0]?.split(":")[1] || "image/jpeg") : "image/jpeg",
    createdAt: new Date().toISOString(),
  };

  store.media.unshift(newMedia);
  saveDataStore(store);
  logActivity("Media Uploaded", `Added media asset: "${mediaName}"`);

  return res.json({ success: true, media: newMedia });
});

// Delete Media
router.delete("/media/:id", requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const store = getStore();
  const index = store.media.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Media item not found." });
  }

  const deletedName = store.media[index].name;
  store.media.splice(index, 1);
  saveDataStore(store);
  logActivity("Media Deleted", `Deleted media asset: "${deletedName}"`);

  return res.json({ success: true, message: "Media item deleted successfully." });
});

// ---------------- SITE SETTINGS & HOMEPAGE CONTENT ----------------

// Save Settings
router.post("/settings", requireAdminAuth, (req: Request, res: Response) => {
  const store = getStore();
  const { websiteName, logoUrl, faviconUrl, phone, email, address, googleMapsUrl, socialLinks, seo, homepage } = req.body;

  store.settings = {
    websiteName: websiteName !== undefined ? websiteName : store.settings.websiteName,
    logoUrl: logoUrl !== undefined ? logoUrl : store.settings.logoUrl,
    faviconUrl: faviconUrl !== undefined ? faviconUrl : store.settings.faviconUrl,
    phone: phone !== undefined ? phone : store.settings.phone,
    email: email !== undefined ? email : store.settings.email,
    address: address !== undefined ? address : store.settings.address,
    googleMapsUrl: googleMapsUrl !== undefined ? googleMapsUrl : store.settings.googleMapsUrl,
    socialLinks: socialLinks ? { ...store.settings.socialLinks, ...socialLinks } : store.settings.socialLinks,
    seo: seo ? { ...store.settings.seo, ...seo } : store.settings.seo,
    homepage: homepage ? { ...store.settings.homepage, ...homepage } : store.settings.homepage,
  };

  saveDataStore(store);
  logActivity("Settings Updated", "Updated global website settings and homepage content.");

  return res.json({ success: true, settings: store.settings });
});

export default router;
