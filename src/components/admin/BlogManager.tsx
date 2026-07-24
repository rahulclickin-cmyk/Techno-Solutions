import React, { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  X,
  AlertTriangle,
  Globe,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import RichTextEditor from "./RichTextEditor";

interface BlogManagerProps {
  token: string;
}

export default function BlogManager({ token }: BlogManagerProps) {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Digital Transformation");
  const [tags, setTags] = useState("");
  const [keywords, setKeywords] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState<"published" | "draft">("published");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [author, setAuthor] = useState("Sanjeev Goel");
  const [readTime, setReadTime] = useState("5 min read");

  // Delete modal state
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [deleteBlogTitle, setDeleteBlogTitle] = useState("");

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        search: searchTerm,
        status: statusFilter,
        category: categoryFilter,
      });
      const res = await fetch(`/api/admin/blogs?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err) {
      console.error("Error loading blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, statusFilter, categoryFilter, token]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!editingBlogId) {
      // Auto-generate slug for new blog
      const autoSlug = newTitle
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(autoSlug);
      if (!metaTitle) setMetaTitle(`${newTitle} | Techno-Solutions`);
    }
  };

  const openCreateModal = () => {
    setEditingBlogId(null);
    setTitle("");
    setSlug("");
    setSummary("");
    setContent("");
    setCategory("Digital Transformation");
    setTags("Automation, Tech, Solutions");
    setKeywords("Techno Solutions, Tech Delhi");
    setImage("https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb");
    setStatus("published");
    setMetaTitle("");
    setMetaDescription("");
    setAuthor("Sanjeev Goel");
    setReadTime("5 min read");
    setErrorMsg("");
    setIsFormOpen(true);
  };

  const openEditModal = (blog: any) => {
    setEditingBlogId(blog.id);
    setTitle(blog.title || "");
    setSlug(blog.slug || "");
    setSummary(blog.summary || "");
    setContent(blog.content || "");
    setCategory(blog.category || "General");
    setTags(Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "");
    setKeywords(Array.isArray(blog.keywords) ? blog.keywords.join(", ") : blog.keywords || "");
    setImage(blog.image || "");
    setStatus(blog.status || "published");
    setMetaTitle(blog.metaTitle || "");
    setMetaDescription(blog.metaDescription || "");
    setAuthor(blog.author || "Sanjeev Goel");
    setReadTime(blog.readTime || "5 min read");
    setErrorMsg("");
    setIsFormOpen(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setErrorMsg("Title and content are required.");
      return;
    }

    setSaving(true);
    setErrorMsg("");

    const payload = {
      title,
      slug,
      summary: summary || title,
      content,
      category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
      image: image || "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb",
      status,
      metaTitle: metaTitle || `${title} | Techno-Solutions`,
      metaDescription: metaDescription || summary || title,
      author,
      readTime,
    };

    try {
      const url = editingBlogId ? `/api/admin/blogs/${editingBlogId}` : "/api/admin/blogs";
      const method = editingBlogId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save blog post.");
      }

      setIsFormOpen(false);
      fetchBlogs();
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteBlogId) return;
    try {
      const res = await fetch(`/api/admin/blogs/${deleteBlogId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setDeleteBlogId(null);
        fetchBlogs();
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  const categoriesList = ["Digital Transformation", "Automation", "AI", "Blockchain", "Smart Home", "Solar", "Industry Trends"];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0F2D63]" />
            <span>Blog Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Publish, edit, search, and manage website blog posts and articles.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-[#0F2D63] hover:bg-[#11326c] text-white font-semibold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#E5AF2B]" />
          <span>Add New Blog Post</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search blogs by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-[#0F2D63] focus:bg-white transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-hidden"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-hidden"
            >
              <option value="all">All Categories</option>
              {categoriesList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Blog Posts Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs">Loading blog posts...</div>
        ) : blogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Post</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={blog.image || "https://lh3.googleusercontent.com/d/1g8gzOldNaSzAH4yAvR-8xsNUdU5S2Jxb"}
                          alt={blog.title}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block line-clamp-1">
                            {blog.title}
                          </span>
                          <span className="text-slate-400 text-[11px] block mt-0.5 font-mono">
                            /blog/{blog.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0F2D63] font-semibold text-[11px]">
                        {blog.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-600 font-medium">{blog.author}</td>

                    <td className="py-4 px-4 text-slate-500 text-[11px]">{blog.date}</td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          blog.status === "published"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {blog.status === "published" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>{blog.status}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View on public site"
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => openEditModal(blog)}
                          title="Edit post"
                          className="p-1.5 hover:bg-blue-50 rounded-lg text-[#0F2D63] transition-colors cursor-pointer"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            setDeleteBlogId(blog.id);
                            setDeleteBlogTitle(blog.title);
                          }}
                          title="Delete post"
                          className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 text-xs">
            No blog posts found matching criteria. Click "Add New Blog Post" to create one.
          </div>
        )}
      </div>

      {/* Add/Edit Blog Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 md:p-8 my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                {editingBlogId ? "Edit Blog Post" : "Add New Blog Post"}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSaveBlog} className="space-y-6">
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Enterprise AI Trends in 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    URL Slug (SEO friendly)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[11px]">
                      /blog/
                    </span>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="enterprise-ai-trends-2026"
                      className="w-full pl-14 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Category, Status, Author */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden bg-white"
                  >
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden bg-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Author
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Featured Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                  />
                  {image && (
                    <img
                      src={image}
                      alt="Preview"
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                  )}
                </div>
              </div>

              {/* Short Summary */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Short Description / Summary
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Brief 1-2 sentence overview shown on blog cards..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                />
              </div>

              {/* Full Content (Rich Text Editor) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Full Blog Content (WYSIWYG Rich Text) *
                </label>
                <RichTextEditor value={content} onChange={setContent} />
              </div>

              {/* Tags & Keywords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="AI, Automation, Enterprise"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Keywords (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="Digital Transformation Delhi, AI Consulting"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* SEO Meta Fields */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  <Globe className="w-4 h-4 text-[#0F2D63]" />
                  <span>SEO Search Meta Settings</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="SEO Title shown in Google"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Meta Description
                    </label>
                    <input
                      type="text"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      placeholder="150 character meta description"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#0F2D63] hover:bg-[#11326c] text-white text-xs font-bold cursor-pointer transition-all shadow-md"
                >
                  {saving ? "Saving Post..." : editingBlogId ? "Update Blog Post" : "Publish Blog Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {deleteBlogId && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Blog Post?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete <strong className="text-slate-800">"{deleteBlogTitle}"</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteBlogId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md"
              >
                Yes, Delete Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
