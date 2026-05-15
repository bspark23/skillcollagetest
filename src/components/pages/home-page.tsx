"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useAppSelector } from "@/store/hooks";
import { useContent } from "@/hooks/use-content";
import { Section, Item } from "@/models/content";
import { useAppDispatch } from "@/store/hooks";
import { fetchPosts } from "@/store/slices/blog-slice";
import { Post } from "@/models/post";
import { SubscriberService } from "@/services/subscriber.service";

const NAVY = "#01244A";
const ORANGE = "#E58825";
const PEACH = "#FEF5EC";
const WHITE = "#FFFFFF";
const PARTNER_CARD = "#FBEADB";
const RESEARCH_CARD = "#F6D7B6";
const WHY_CARD = "#D8EAFE";

export default function HomePage() {
  useContent();
  const dispatch = useAppDispatch();
  const { home } = useAppSelector((s) => s.content.content.siteContent);
  const { posts } = useAppSelector((s) => s.blog);

  const s1 = home?.section1 as Section;
  const s2 = home?.section2 as Section;
  const s3 = home?.section3 as Section;
  const s4 = home?.section4 as Section;
  const s5 = home?.section5 as Section;
  const s6 = home?.section6 as Section;
  const s7 = home?.section7 as Section;
  const s8 = home?.section8 as Section;
  const s9 = home?.section9 as Section;

  const coreServices = s2?.items || [];
  const whyChoose = s3?.items || [];
  const partners = s4?.items || [];
  const researchServices = s5?.items || [];
  const stats = (s8?.items || []).map((i) => ({ value: i.title, label: i.body }));

  useEffect(() => { dispatch(fetchPosts({})); }, [dispatch]);

  const blogPosts = posts.length > 0
    ? posts.slice(0, 3).map((p: Post) => ({ id: p.id, slug: p.slug, title: p.title, excerpt: p.excerpt, image: p.featuredMedia?.url || "", date: p.publishedAt || p.createdAt }))
    : [];

  const slides = s1?.images?.length ? s1.images : (s1?.image ? [s1.image] : []);

  const [slide, setSlide] = useState(0);
  const next = useCallback(() => setSlide((s) => (slides.length ? (s + 1) % slides.length : 0)), [slides.length]);
  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, slides.length]);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSending, setNewsletterSending] = useState(false);
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");

  const submitNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSending(true);
    setNewsletterError("");
    try {
      await SubscriberService.subscribe({
        name: newsletterEmail.split("@")[0] || newsletterEmail,
        email: newsletterEmail,
        type: "newsletter",
      });
      setNewsletterEmail("");
      setNewsletterSent(true);
      setTimeout(() => setNewsletterSent(false), 4000);
    } catch {
      setNewsletterError(s9?.body || "");
    } finally {
      setNewsletterSending(false);
    }
  };

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
    catch { return d; }
  };

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: WHITE, color: "#222" }}>

      {/* HERO CAROUSEL — full bleed, text centered */}
      <section style={{ position: "relative", width: "100%", minHeight: "clamp(500px, 64.6vw, 1117px)", overflow: "hidden", marginTop: -92 }}>
        {slides.length > 0 ? (
          slides.map((src, i) => (
            <div key={i} style={{ position: "absolute", inset: 0, transition: "opacity 0.8s ease", opacity: i === slide ? 1 : 0 }}>
              <Image src={src} alt={s1?.title || ""} fill style={{ objectFit: "cover", objectPosition: "center" }} priority={i === 0} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
            </div>
          ))
        ) : (
          <div style={{ position: "absolute", inset: 0, background: NAVY }} />
        )}

        {/* Content — centered */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", minHeight: "clamp(500px, 64.6vw, 1117px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 108, textAlign: "center", padding: "108px 20px 60px" }}>
          <h1 style={{ color: WHITE, fontWeight: 800, lineHeight: 1.1, marginBottom: 20, fontSize: "clamp(28px, 4.5vw, 64px)", maxWidth: 700 }}>
            {s1?.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "clamp(13px, 1.2vw, 16px)", lineHeight: 1.75, marginBottom: 36, maxWidth: 560 }}>
            {s1?.body}
          </p>
          {s1?.buttons?.length ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
              {s1.buttons.map((b, i) => (
                <Link
                  key={i}
                  href={b.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: i === 0 ? NAVY : WHITE,
                    color: i === 0 ? WHITE : NAVY,
                    borderRadius: 100,
                    fontWeight: 600,
                    textDecoration: "none",
                    fontSize: "clamp(13px, 1vw, 15px)",
                    padding: "14px 32px",
                  }}
                >
                  {b.title} {i === 0 ? <span>&#8594;</span> : null}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {/* Dots only — no arrows */}
        {slides.length > 1 ? (
          <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", gap: 8 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Slide ${i + 1}`}
                style={{ width: i === slide ? 28 : 10, height: 10, borderRadius: 100, background: i === slide ? WHITE : "rgba(255,255,255,0.45)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }}
              />
            ))}
          </div>
        ) : null}
      </section>

      {/* OUR CORE SERVICES */}
      <section style={{ background: WHITE, padding: "60px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ color: ORANGE, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>{s2?.overline}</p>
            <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 32px)", marginBottom: 10 }}>{s2?.title}</h2>
            <p style={{ color: "#666", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>{s2?.body}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 17 }}>
            {coreServices.map((item: Item, i: number) => (
              <div key={i} style={{ background: PEACH, borderRadius: 24, border: "1px solid rgba(229,136,37,0.2)", padding: 32, display: "flex", flexDirection: "column", gap: 17, minHeight: 200, boxSizing: "border-box" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(229,136,37,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ color: NAVY, fontWeight: 700, fontSize: 14, marginBottom: 6, lineHeight: 1.3 }}>{item.title}</h3>
                  <p style={{ color: "#555", fontSize: 12, lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {stats.length ? (
        <section style={{ background: WHITE, padding: "0 20px 60px", boxSizing: "border-box" }} className="md:px-[120px]">
          <div style={{ maxWidth: 1728, margin: "0 auto" }}>
            <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 16 }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ border: "1px solid rgba(229,136,37,0.35)", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: PEACH, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.1 }}>{stat.value}</div>
                    <div style={{ color: "#777", fontSize: 12, marginTop: 2 }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* WHY CHOOSE SKILL COLLEGE — #01244A bg, cards #D8EAFE */}
      <section style={{ background: NAVY, width: "100%", padding: "120px 20px 111px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ color: WHITE, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 32px)", marginBottom: 10 }}>{s3?.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>{s3?.body}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 32, alignItems: "center" }}>
            {/* Left image */}
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "1/1", maxHeight: 500, width: "100%" }}>
              {s3?.image ? <Image src={s3.image} alt={s3.title || ""} fill style={{ objectFit: "cover" }} /> : null}
            </div>
            {/* Right cards — 728x174, #D8EAFE, border-radius 24, padding 32, gap 32 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {whyChoose.map((item: Item, i: number) => (
                <div key={i} style={{ background: WHY_CARD, borderRadius: 24, border: "1px solid rgba(1,36,74,0.1)", padding: 32, minHeight: 174, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <h3 style={{ color: NAVY, fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{item.title}</h3>
                  <p style={{ color: "#444", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR PARTNERS — white bg, cards #FBEADB, no heading above */}
      <section style={{ background: WHITE, padding: "80px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 30px)", marginBottom: 8 }}>{s4?.title}</h2>
            <p style={{ color: "#666", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 440, margin: "0 auto", lineHeight: 1.75 }}>{s4?.body}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 20 }}>
            {partners.map((p: Item, i: number) => (
              <div key={i} style={{ background: PARTNER_CARD, borderRadius: 20, padding: "32px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(229,136,37,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ORANGE} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ color: NAVY, fontWeight: 700, fontSize: 15, marginBottom: 10, lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ color: "#555", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR RESEARCH SERVICES — #E58825 bg, centered heading, cards #F6D7B6 left, image right */}
      <section style={{ background: ORANGE, width: "100%", padding: "80px 20px 100px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto" }}>
          {/* Centered heading */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ color: WHITE, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 32px)", marginBottom: 10 }}>{s5?.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>{s5?.body}</p>
          </div>
          {/* 2-col: cards left, image right */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 32, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {researchServices.map((item: Item, i: number) => (
                <div key={i} style={{ background: RESEARCH_CARD, borderRadius: 16, padding: "20px 24px" }}>
                  <h4 style={{ color: NAVY, fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{item.title}</h4>
                  <p style={{ color: "#555", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", width: "100%" }}>
              {s5?.image ? <Image src={s5.image} alt={s5.title || ""} fill style={{ objectFit: "cover" }} /> : null}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG AND INSIGHTS */}
      <section style={{ background: WHITE, padding: "80px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 30px)", marginBottom: 8 }}>{s6?.title}</h2>
            <p style={{ color: "#666", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 440, margin: "0 auto", lineHeight: 1.75 }}>{s6?.body}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
            {blogPosts.map((post, i: number) => (
              <Link key={i} href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(1,36,74,0.1)", background: WHITE }}>
                <div style={{ position: "relative", height: 190, background: "#e8e8e8", flexShrink: 0 }}>
                  {post.image && <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} />}
                </div>
                <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                  <span style={{ color: ORANGE, fontSize: 11, fontWeight: 600 }}>{formatDate(post.date)}</span>
                  <h3 style={{ color: NAVY, fontWeight: 700, fontSize: 13, lineHeight: 1.45, margin: 0 }}>{post.title}</h3>
                  <p style={{ color: "#666", fontSize: 12, lineHeight: 1.65, margin: 0, flex: 1 }}>{post.excerpt}</p>
                  <span style={{ color: ORANGE, fontSize: 12, fontWeight: 600, marginTop: 6 }}>Read More</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* READY TO TRANSFORM — #FEF5EC */}
      <section style={{ background: PEACH, padding: "80px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 32px)", marginBottom: 12 }}>{s7?.title}</h2>
          <p style={{ color: "#555", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.75 }}>{s7?.body}</p>
          {s7?.button ? (
            <Link href={s7.button.href} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: NAVY, color: WHITE, borderRadius: 100, fontWeight: 700, textDecoration: "none", fontSize: "clamp(13px, 1vw, 15px)", padding: "15px 40px" }}>
              {s7.button.title}
            </Link>
          ) : null}
        </div>
      </section>

      {/* NEWSLETTER — #01244A */}
      <section style={{ background: NAVY, width: "100%", padding: "80px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: WHITE, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 30px)", marginBottom: 8 }}>{s9?.title}</h2>
          <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 440, margin: "0 auto 28px", lineHeight: 1.75 }}>{s9?.subtitle || s9?.body}</p>
          <form onSubmit={submitNewsletter} className="flex flex-col md:flex-row justify-center" style={{ gap: 12, maxWidth: 480, margin: "0 auto" }}>
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={s9?.overline || ""}
              style={{ flex: 1, padding: "14px 22px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)", color: WHITE, fontSize: 14, outline: "none" }}
            />
            <button type="submit" disabled={newsletterSending} style={{ background: ORANGE, color: WHITE, border: "none", borderRadius: 100, padding: "14px 32px", fontSize: 14, fontWeight: 700, cursor: newsletterSending ? "not-allowed" : "pointer", whiteSpace: "nowrap", opacity: newsletterSending ? 0.7 : 1 }}>
              {s9?.button?.title}
            </button>
          </form>
          {newsletterError ? <p style={{ marginTop: 12, color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{newsletterError}</p> : null}
          {newsletterSent ? <p style={{ marginTop: 12, color: "rgba(255,255,255,0.8)", fontSize: 12 }}>{s9?.body}</p> : null}
        </div>
      </section>

    </div>
  );
}
