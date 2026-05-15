"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPosts } from "@/store/slices/blog-slice";
import { Post } from "@/models/post";
import { useContent } from "@/hooks/use-content";
import { Section } from "@/models/content";

const NAVY = "#01244A";
const ORANGE = "#E58825";
const PEACH = "#FEF5EC";
const WHITE = "#FFFFFF";

export default function BlogPage() {
  useContent();
  const dispatch = useAppDispatch();
  const { posts, isLoading } = useAppSelector((s) => s.blog);
  const { blog } = useAppSelector((s) => s.content.content.siteContent);
  const s1 = blog?.section1 as Section;
  const s8 = blog?.section8 as Section;

  useEffect(() => { dispatch(fetchPosts({})); }, [dispatch]);

  const displayPosts = posts.map((p: Post) => ({ id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt, image: p.featuredMedia?.url || "", date: p.publishedAt || p.createdAt }));

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
    catch { return d; }
  };

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: WHITE }}>

      <section style={{ position: "relative", width: "100%", minHeight: "clamp(380px, 64.6vw, 1117px)", overflow: "hidden", marginTop: -88 }}>
        {s1?.image ? (
          <Image src={s1.image} alt={s1.title || ""} fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
        ) : null}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 60, paddingLeft: 20, paddingRight: 20, textAlign: "center" }}>
          <h1 style={{ color: WHITE, fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", marginBottom: 12, lineHeight: 1.1 }}>{s1?.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(13px, 1.2vw, 15px)", maxWidth: 520, lineHeight: 1.75 }}>{s1?.body}</p>
        </div>
      </section>

      <section style={{ background: WHITE, padding: "72px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto" }}>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#999" }}>Loading posts...</div>
          ) : displayPosts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#999" }}>No posts available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 28 }}>
              {displayPosts.map((post, i) => (
                <Link key={i} href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", background: WHITE, border: "1px solid rgba(1,36,74,0.08)", transition: "box-shadow 0.2s" }}>
                  <div style={{ position: "relative", height: 200, background: "#e8e8e8", flexShrink: 0 }}>
                    {post.image && <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} />}
                  </div>
                  <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <h3 style={{ color: NAVY, fontWeight: 700, fontSize: 14, lineHeight: 1.45, margin: 0 }}>{post.title}</h3>
                    <p style={{ color: "#666", fontSize: 12, lineHeight: 1.65, margin: 0, flex: 1 }}>{post.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                      <span style={{ color: "#aaa", fontSize: 11 }}>{formatDate(post.date)}</span>
                      <span style={{ color: ORANGE, fontSize: 12, fontWeight: 600 }}>Read more</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ background: PEACH, padding: "80px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 32px)", marginBottom: 12 }}>{s8?.title}</h2>
          <p style={{ color: "#555", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.75 }}>{s8?.body}</p>
          {s8?.button ? (
            <Link href={s8.button.href} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: NAVY, color: WHITE, borderRadius: 100, fontWeight: 700, textDecoration: "none", fontSize: "clamp(13px, 1vw, 15px)", padding: "15px 40px" }}>
              {s8.button.title} <span>&#8594;</span>
            </Link>
          ) : null}
        </div>
      </section>

    </div>
  );
}
