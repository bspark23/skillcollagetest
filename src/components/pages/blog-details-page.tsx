"use client";

import Link from "next/link";
import Image from "next/image";
import { Post } from "@/models/post";
import { Calendar, User, ArrowLeft } from "lucide-react";

const NAVY = "#01244A";
const ORANGE = "#E58825";
const PEACH = "#FEF5EC";
const WHITE = "#FFFFFF";

export default function BlogDetailsPage({ post, relatedPosts = [] }: { post: Post; relatedPosts?: Post[] }) {
  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }); }
    catch { return d; }
  };

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: WHITE, color: "#222" }}>

      {/* HERO WITH FEATURED IMAGE */}
      <section style={{ position: "relative", width: "100%", minHeight: "clamp(400px, 50vw, 600px)", overflow: "hidden", marginTop: -88 }}>
        {post.featuredMedia?.url ? (
          <>
            <Image 
              src={post.featuredMedia.url} 
              alt={post.title} 
              fill 
              style={{ objectFit: "cover", objectPosition: "center" }} 
              priority 
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(1,36,74,0.7), rgba(1,36,74,0.85))" }} />
          </>
        ) : (
          <div style={{ position: "absolute", inset: 0, background: NAVY }} />
        )}
        
        <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 60, paddingLeft: 20, paddingRight: 20, textAlign: "center" }}>
          <h1 style={{ color: WHITE, fontWeight: 800, fontSize: "clamp(24px, 4vw, 48px)", marginBottom: 20, lineHeight: 1.2, maxWidth: 900 }}>
            {post.title}
          </h1>
          
          {/* Meta Info */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Calendar size={16} color={ORANGE} />
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>
                {formatDate(post.publishedAt || post.createdAt)}
              </span>
            </div>
            {post.author && typeof post.author === 'object' && 'name' in post.author && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <User size={16} color={ORANGE} />
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 14 }}>{post.author.name}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section style={{ background: WHITE, padding: "60px 20px 80px" }} className="md:px-[120px]">
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          
          {/* Back Button */}
          <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: NAVY, fontSize: 14, fontWeight: 600, textDecoration: "none", marginBottom: 32 }}>
            <ArrowLeft size={18} />
            Back to Blog
          </Link>

          {/* Excerpt */}
          {post.excerpt && (
            <div style={{ background: PEACH, border: `1px solid ${ORANGE}20`, borderLeft: `4px solid ${ORANGE}`, padding: "20px 24px", borderRadius: 12, marginBottom: 40 }}>
              <p style={{ color: "#555", fontSize: 16, lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>
                {post.excerpt}
              </p>
            </div>
          )}

          {/* Article Content */}
          <div
            className="blog-content"
            style={{ color: "#444", fontSize: 16, lineHeight: 1.9 }}
            dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt || ""}</p>` }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid rgba(1,36,74,0.1)" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {post.tags.map((tag, i) => (
                  <span key={i} style={{ background: PEACH, color: NAVY, padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RELATED POSTS */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section style={{ background: PEACH, padding: "60px 20px 80px" }} className="md:px-[120px]">
          <div style={{ maxWidth: 1728, margin: "0 auto" }}>
            <h2 style={{ color: NAVY, fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 800, marginBottom: 40, textAlign: "center" }}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
              {relatedPosts.slice(0, 3).map((item: Post) => {
                const img = item.featuredMedia?.url;
                const date = formatDate(item.publishedAt || item.createdAt);
                return (
                  <Link key={item.id} href={`/blog/${item.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(1,36,74,0.1)", background: WHITE }}>
                    <div style={{ position: "relative", height: 200, background: "#e8e8e8", flexShrink: 0 }}>
                      {img && <Image src={img} alt={item.title} fill style={{ objectFit: "cover" }} />}
                    </div>
                    <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                      <span style={{ color: ORANGE, fontSize: 12, fontWeight: 600 }}>{date}</span>
                      <h3 style={{ color: NAVY, fontWeight: 700, fontSize: 16, lineHeight: 1.4, margin: 0 }}>{item.title}</h3>
                      <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, margin: 0, flex: 1 }}>{item.excerpt}</p>
                      <span style={{ color: ORANGE, fontSize: 14, fontWeight: 600, marginTop: 8 }}>Read More →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section style={{ background: NAVY, padding: "60px 20px" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: WHITE, fontWeight: 800, fontSize: "clamp(24px, 3vw, 32px)", marginBottom: 16 }}>
            Ready to Transform Your Future?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16, maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.75 }}>
            Join hundreds of individuals and organizations who have benefited from our programs and services.
          </p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: ORANGE, color: WHITE, borderRadius: 100, fontWeight: 700, textDecoration: "none", fontSize: 15, padding: "16px 40px" }}>
            Get Started Today
          </Link>
        </div>
      </section>

    </div>
  );
}
