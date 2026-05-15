"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { useContent } from "@/hooks/use-content";
import { Item, Section } from "@/models/content";

const NAVY = "#01244A";
const ORANGE = "#E58825";
const PEACH = "#FEF5EC";
const WHITE = "#FFFFFF";

export default function ServicesPage() {
  useContent();
  const { services } = useAppSelector((s) => s.content.content.siteContent);
  const s1 = services?.section1 as Section;
  const s2 = services?.section2 as Section;
  const s8 = services?.section8 as Section;
  const serviceItems = (s2?.items || []) as Item[];

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: WHITE, color: "#222" }}>

      <section style={{ position: "relative", width: "100%", minHeight: "clamp(380px, 64.6vw, 1117px)", overflow: "hidden", marginTop: -88 }}>
        {s1?.image ? (
          <Image src={s1.image} alt={s1.title || ""} fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
        ) : null}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.48)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 80, paddingLeft: 20, paddingRight: 20, textAlign: "center" }}>
          <h1 style={{ color: WHITE, fontWeight: 800, fontSize: "clamp(28px, 4vw, 56px)", marginBottom: 14, lineHeight: 1.1 }}>{s1?.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(13px, 1.2vw, 16px)", maxWidth: 560, lineHeight: 1.75 }}>{s1?.body}</p>
        </div>
      </section>

      <section style={{ background: WHITE, padding: "80px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 32px)", marginBottom: 8 }}>{s2?.title}</h2>
            <p style={{ color: "#666", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 480, margin: "0 auto", lineHeight: 1.75 }}>{s2?.body}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48, alignItems: "flex-start" }}>
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "3/4", width: "100%", maxHeight: 600 }}>
              {s2?.image ? <Image src={s2.image} alt={s2.title || ""} fill style={{ objectFit: "cover" }} /> : null}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {serviceItems.map((svc, i) => {
                const items = (svc.thumbnail || "").split("|").map((s) => s.trim()).filter(Boolean);
                const cta = svc.video || "";
                return (
                <div key={i}>
                  <h3 style={{ color: ORANGE, fontWeight: 800, fontSize: "clamp(16px, 1.8vw, 20px)", marginBottom: 8 }}>{svc.title}</h3>
                  <p style={{ color: "#555", fontSize: 13, lineHeight: 1.75, marginBottom: 12 }}>{svc.body}</p>
                  {items.length ? (
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 6 }}>
                      {items.map((item, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, color: "#444", fontSize: 13 }}>
                          <span style={{ color: ORANGE, fontWeight: 700, flexShrink: 0 }}>&#10003;</span>{item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {cta ? <p style={{ color: "#888", fontSize: 12, fontStyle: "italic", lineHeight: 1.6 }}>{cta}</p> : null}
                  {i < serviceItems.length - 1 && <div style={{ height: 1, background: "rgba(1,36,74,0.08)", marginTop: 24 }} />}
                </div>
              )})}
            </div>
          </div>
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
