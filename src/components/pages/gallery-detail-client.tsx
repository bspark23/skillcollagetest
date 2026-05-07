"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PostService } from "@/services/post.service";
import { Post } from "@/models/post";
import { Crown, ChevronLeft, ArrowRight } from "lucide-react";

const inner = "max-w-[1440px] mx-auto px-4 md:px-[80px]";
const GOLD = "#D4A017";
const DARK = "#0a0a0a";
const DARK2 = "#111111";
const CARD_BG = "#161616";

export default function GalleryDetailClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    PostService.getPostBySlug(slug)
      .then(setPost)
      .catch(() => PostService.getPost(slug).then(setPost).catch(() => setPost(null)))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div style={{ padding: 120, textAlign: "center", color: "rgba(255,255,255,0.4)", background: DARK }}>Loading...</div>;
  if (!post) return (
    <div style={{ padding: 120, textAlign: "center", background: DARK }}>
      <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Project not found.</p>
      <Link href="/gallery" style={{ color: GOLD, fontSize: 13, fontWeight: 600 }}>← Back to Gallery</Link>
    </div>
  );

  const gallery = [post.featuredMedia?.url, ...(post.gallery?.map(g => g.url) || [])].filter(Boolean) as string[];

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: DARK }}>

      {/* HERO */}
      <section style={{ background: DARK2, paddingTop: 120, paddingBottom: 48 }}>
        <div className={inner}>
          <Link href="/gallery" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", marginBottom: 24 }}>
            <ChevronLeft size={15} /> Back to Gallery
          </Link>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(212,160,23,0.12)", border: "1px solid rgba(212,160,23,0.3)", borderRadius: 100, padding: "4px 12px", marginBottom: 16, marginLeft: 16 }}>
            <span style={{ color: GOLD, fontSize: 11, fontWeight: 600 }}>{post.category?.name || "Portfolio"}</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800, lineHeight: 1.2, maxWidth: 700 }}>{post.title}</h1>
        </div>
      </section>

      {/* MAIN IMAGE */}
      <section style={{ background: DARK, paddingTop: 0, paddingBottom: 48 }}>
        <div className={inner}>
          {gallery[0] ? (
            <div style={{ borderRadius: 20, overflow: "hidden", aspectRatio: "16/9", backgroundImage: `url('${gallery[0]}')`, backgroundSize: "cover", backgroundPosition: "center", marginBottom: 16 }} />
          ) : (
            <div style={{ borderRadius: 20, background: CARD_BG, aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <Crown size={48} color="rgba(212,160,23,0.2)" />
            </div>
          )}

          {/* Gallery grid */}
          {gallery.length > 1 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {gallery.slice(1, 5).map((src, i) => (
                <div key={i} style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "4/3", backgroundImage: `url('${src}')`, backgroundSize: "cover", backgroundPosition: "center", background: src ? undefined : CARD_BG }} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: DARK2, paddingTop: 48, paddingBottom: 72 }}>
        <div className={inner}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Project Overview</h2>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.9 }}>
                {post.content || post.excerpt || "A comprehensive hospitality project delivered with excellence and precision."}
              </p>
            </div>
            <div style={{ background: CARD_BG, borderRadius: 16, padding: "24px", border: "1px solid rgba(212,160,23,0.1)" }}>
              <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Project Details</h3>
              {[
                { label: "Category", value: post.category?.name || "Portfolio" },
                { label: "Tags", value: post.tags?.map(t => t.name).join(", ") || "—" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{row.label}</span>
                  <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{row.value}</span>
                </div>
              ))}
              <Link href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: GOLD, color: DARK, padding: "13px", borderRadius: 100, fontSize: 13, fontWeight: 700, textDecoration: "none", marginTop: 20 }}>
                Start A Similar Project <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${GOLD} 0%, #b8860b 100%)`, paddingTop: 72, paddingBottom: 72 }}>
        <div className={`${inner} text-center`}>
          <h2 style={{ color: DARK, fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 800, marginBottom: 12 }}>Ready to Transform Your Hospitality Experience?</h2>
          <p style={{ color: "rgba(0,0,0,0.6)", fontSize: 14, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 28px" }}>Let's work together to create exceptional experiences that exceed expectations.</p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: DARK, color: "#fff", padding: "14px 36px", borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
            Start A Project Today →
          </Link>
        </div>
      </section>

    </div>
  );
}
