"use client";

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/models/post";
import { ChevronRight, Calendar, User } from "lucide-react";

const inner = "max-w-[1440px] mx-auto px-4 md:px-[120px]";

export default function BlogDetailsPage({ post, relatedPosts = [] }: { post: Post; relatedPosts?: Post[] }) {
  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }); }
    catch { return d; }
  };

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: "#0a0a0a", color: "#fff" }}>

      {/* HERO */}
      <section className="relative w-full flex items-center justify-center overflow-hidden -mt-[72px] pt-[72px]" style={{ height: "350px", background: "linear-gradient(90deg, #000000 0%, #18181B 50%, #000000 100%)" }}>
        <div className="relative z-10 text-center px-5">
          {/* Breadcrumb */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textDecoration: "none" }}>Home</Link>
            <ChevronRight size={14} color="rgba(255,255,255,0.4)" />
            <Link href="/blog" style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textDecoration: "none" }}>Blog</Link>
            <ChevronRight size={14} color="rgba(255,255,255,0.4)" />
            <span style={{ color: "#FEC700", fontSize: 13 }}>Article</span>
          </div>
          <h1 className="text-white font-bold leading-tight" style={{ fontSize: "clamp(24px, 4vw, 40px)", maxWidth: 900, margin: "0 auto" }}>
            {post.title}
          </h1>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section style={{ background: "#0a0a0a", paddingTop: 48, paddingBottom: 64 }}>
        <div className={inner}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            
            {/* Meta Info */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Calendar size={16} color="#FEC700" />
                <span style={{ color: "#b0b0b0", fontSize: 13 }}>
                  {formatDate(post.publishedAt || post.createdAt)}
                </span>
              </div>
              {post.author && typeof post.author === 'object' && 'name' in post.author && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <User size={16} color="#FEC700" />
                  <span style={{ color: "#b0b0b0", fontSize: 13 }}>{post.author.name}</span>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {post.featuredMedia?.url && (
              <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 40, position: "relative", height: "clamp(300px, 50vw, 500px)" }}>
                <Image src={post.featuredMedia.url} alt={post.title} fill style={{ objectFit: "cover" }} />
              </div>
            )}

            {/* Excerpt */}
            {post.excerpt && (
              <div style={{ background: "#1a1a1a", border: "1px solid #333", borderLeft: "4px solid #FEC700", padding: "20px 24px", borderRadius: 8, marginBottom: 32 }}>
                <p style={{ color: "#e0e0e0", fontSize: 15, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
                  {post.excerpt}
                </p>
              </div>
            )}

            {/* Article Content */}
            <div
              className="blog-content"
              style={{ color: "#d0d0d0", fontSize: 15, lineHeight: 1.9 }}
              dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt || ""}</p>` }}
            />

            {/* Back to Blog */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid #333" }}>
              <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#FEC700", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                ← Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section style={{ background: "#0a0a0a", paddingTop: 32, paddingBottom: 64 }}>
          <div className={inner}>
            <h2 style={{ color: "#fff", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, marginBottom: 32, textAlign: "center" }}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.slice(0, 3).map((item: Post, i: number) => {
                const img = item.featuredMedia?.url;
                const date = formatDate(item.publishedAt || item.createdAt);
                return (
                  <div key={i} style={{ background: "#1a1a1a", borderRadius: 14, overflow: "hidden", border: "1px solid #333", display: "flex", flexDirection: "column" }}>
                    <div style={{ height: 200, backgroundImage: img ? `url('${img}')` : "none", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: img ? undefined : "#333", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} />
                    <div style={{ padding: "18px 20px 20px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 800, marginBottom: 8, lineHeight: 1.35 }}>{item.title}</h3>
                        <p style={{ color: "#b0b0b0", fontSize: 12, lineHeight: 1.6, marginBottom: 16 }}>{item.excerpt}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ color: "#808080", fontSize: 11 }}>{date}</span>
                        <Link href={`/blog?slug=${item.slug}`} style={{ color: "#FEC700", fontSize: 12, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ background: "linear-gradient(90deg, #FEC700 0%, #D08602 100%)", paddingTop: 72, paddingBottom: 72 }}>
        <div className={`${inner} text-center`}>
          <h2 style={{ color: "#000", fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 800, marginBottom: 12 }}>Ready to Transform Your Hospitality Experience?</h2>
          <p style={{ color: "#333", fontSize: 14, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 28px" }}>Let's work together to create exceptional experiences that exceed expectations.</p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#000", color: "#FEC700", padding: "14px 36px", borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Start a Project Today →
          </Link>
        </div>
      </section>

    </div>
  );
}
