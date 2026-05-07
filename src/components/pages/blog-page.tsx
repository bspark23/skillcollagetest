"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPosts } from "@/store/slices/blog-slice";
import { Post } from "@/models/post";

const NAVY = "#01244A";
const ORANGE = "#E58825";
const PEACH = "#FEF5EC";
const WHITE = "#FFFFFF";

const DEFAULT_POSTS = [
  { id: "1", slug: "empowering-youth-through-skills-development", title: "Empowering Youth Through Skills Development...", excerpt: "Discover how targeted skills training is transforming livelihoods and creating economic opportunities for young people.", image: "/images/blog-&-insight/skill-college-blog-&-insight-img1.png", date: "May 20, 2025" },
  { id: "2", slug: "importance-of-msme-support", title: "The Importance of MSME Support for Economic Recovery", excerpt: "The development of micro, small and medium enterprises plays a critical role in economic recovery and job creation.", image: "/images/blog-&-insight/skill-college-blog-&-insight-img2.png", date: "May 18, 2025" },
  { id: "3", slug: "research-for-development", title: "Research for Development: Measuring What Matters", excerpt: "Why rigorous research and evaluation frameworks are essential for organizations committed to collective development.", image: "/images/blog-&-insight/skill-college-blog-&-insight-img3.png", date: "May 15, 2025" },
  { id: "4", slug: "women-entrepreneurship-success-stories", title: "Women Entrepreneurship: Success Stories from Our...", excerpt: "Inspiring stories of women who have transformed their lives through our entrepreneurship programs.", image: "/images/blog-&-insight/skill-college-blog-&-insight-img4.png", date: "May 12, 2025" },
  { id: "5", slug: "tech-skills-digital-economy", title: "Tech Skills for the Digital Economy: What You Need to...", excerpt: "Demand for digital skills has never been higher. Here is how to position yourself for high-income digital opportunities.", image: "/images/blog-&-insight/skill-college-blog-&-insight-img5.png", date: "May 10, 2025" },
  { id: "6", slug: "partnership-for-development", title: "Partnership for Development: Creating Shared Value", excerpt: "How strategic partnerships between organizations and communities are generating sustainable shared value.", image: "/images/blog-&-insight/skill-college-blog-&-insight-img6.png", date: "May 8, 2025" },
];

export default function BlogPage() {
  const dispatch = useAppDispatch();
  const { posts, isLoading } = useAppSelector((s) => s.blog);

  useEffect(() => { dispatch(fetchPosts({})); }, [dispatch]);

  const displayPosts = posts.length > 0
    ? posts.map((p: Post) => ({ id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt, image: p.featuredMedia?.url || "", date: p.publishedAt || p.createdAt }))
    : DEFAULT_POSTS;

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
    catch { return d; }
  };

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: WHITE }}>

      <section style={{ position: "relative", width: "100%", minHeight: "clamp(380px, 64.6vw, 1117px)", overflow: "hidden", marginTop: -88 }}>
        <Image src="/images/blog-&-insight/skill-college-blog-&-insights-slider.png" alt="Blog and Insights" fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 60, paddingLeft: 20, paddingRight: 20, textAlign: "center" }}>
          <h1 style={{ color: WHITE, fontWeight: 800, fontSize: "clamp(28px, 4vw, 52px)", marginBottom: 12, lineHeight: 1.1 }}>Blog & Insights</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(13px, 1.2vw, 15px)", maxWidth: 520, lineHeight: 1.75 }}>Stories, insights, and updates from Skill College on skills development and entrepreneurship.</p>
        </div>
      </section>

      <section style={{ background: WHITE, padding: "72px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto" }}>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#999" }}>Loading posts...</div>
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
          <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 32px)", marginBottom: 12 }}>Ready to Transform Your Future?</h2>
          <p style={{ color: "#555", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.75 }}>Join hundreds of individuals and organizations who have benefited from our programs and services.</p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: NAVY, color: WHITE, borderRadius: 100, fontWeight: 700, textDecoration: "none", fontSize: "clamp(13px, 1vw, 15px)", padding: "15px 40px" }}>
            Get Started Today <span>&#8594;</span>
          </Link>
        </div>
      </section>

    </div>
  );
}