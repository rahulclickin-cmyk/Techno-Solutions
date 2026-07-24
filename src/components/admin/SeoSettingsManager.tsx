import React, { useState, useEffect } from "react";
import { Globe, Save, CheckCircle2, Search, FileText, ToggleLeft, ToggleRight } from "lucide-react";

interface SeoSettingsManagerProps {
  token: string;
}

export default function SeoSettingsManager({ token }: SeoSettingsManagerProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [siteTitle, setSiteTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [robotsTxt, setRobotsTxt] = useState("");
  const [sitemapEnabled, setSitemapEnabled] = useState(true);

  const fetchSeoData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.settings && data.settings.seo) {
        const seo = data.settings.seo;
        setSiteTitle(seo.siteTitle || "");
        setMetaDescription(seo.metaDescription || "");
        setOgTitle(seo.ogTitle || "");
        setOgImage(seo.ogImage || "");
        setRobotsTxt(seo.robotsTxt || "");
        setSitemapEnabled(seo.sitemapEnabled !== false);
      }
    } catch (err) {
      console.error("Failed to load SEO settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");

    const payload = {
      seo: {
        siteTitle,
        metaDescription,
        ogTitle,
        ogImage,
        robotsTxt,
        sitemapEnabled,
      },
    };

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccessMsg("SEO & Indexing settings updated successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (err) {
      console.error("Error updating SEO settings:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-500 text-xs">Loading SEO settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#0F2D63]" />
            <span>SEO & Meta Configuration</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure Google search engine metadata, Open Graph social share cards, robots.txt, and sitemap settings.
          </p>
        </div>

        {successMsg && (
          <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Google Meta Search */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
            <Search className="w-4 h-4 text-[#0F2D63]" />
            <span>Search Engine Optimization (Meta Tags)</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Default Site Title (Title Tag)</label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Global Meta Description</label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#0F2D63] focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Open Graph Social Sharing */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Open Graph Social Cards (Facebook, LinkedIn, Twitter)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Open Graph Title</label>
              <input
                type="text"
                value={ogTitle}
                onChange={(e) => setOgTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Open Graph Image URL</label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Robots.txt and Sitemap */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center justify-between uppercase tracking-wider">
            <span>Crawling & Indexing (Robots.txt & Sitemap)</span>

            <button
              type="button"
              onClick={() => setSitemapEnabled(!sitemapEnabled)}
              className="flex items-center gap-2 cursor-pointer normal-case text-xs font-semibold"
            >
              <span>XML Sitemap:</span>
              {sitemapEnabled ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <ToggleRight className="w-6 h-6" /> Enabled
                </span>
              ) : (
                <span className="text-slate-400 font-bold flex items-center gap-1">
                  <ToggleLeft className="w-6 h-6" /> Disabled
                </span>
              )}
            </button>
          </h2>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Robots.txt Content</label>
            <textarea
              rows={4}
              value={robotsTxt}
              onChange={(e) => setRobotsTxt(e.target.value)}
              className="w-full p-3 font-mono text-xs rounded-xl border border-slate-300 bg-slate-900 text-slate-100 leading-relaxed"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Live robots.txt served at <code className="text-[#0F2D63]">/robots.txt</code>
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-[#0F2D63] hover:bg-[#11326c] text-white font-bold flex items-center gap-2 shadow-md cursor-pointer transition-all"
          >
            <Save className="w-4 h-4 text-[#E5AF2B]" />
            <span>{saving ? "Saving..." : "Save SEO Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
