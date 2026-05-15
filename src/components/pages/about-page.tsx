"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { useContent } from "@/hooks/use-content";
import { Section, Item } from "@/models/content";

const NAVY = "#01244A";
const ORANGE = "#E58825";
const PEACH = "#FEF5EC";
const WHITE = "#FFFFFF";
const WHY_CARD = "#D8EAFE";

export default function AboutPage() {
  useContent();
  const { about } = useAppSelector((s) => s.content.content.siteContent);
  const s1 = about?.section1 as Section;
  const s2 = about?.section2 as Section;
  const s3 = about?.section3 as Section;
  const s5 = about?.section5 as Section;
  const s9 = about?.section9 as Section;
  const whoWeAreItems: Item[] = s2?.items || [];
  const coreValues: Item[] = s5?.items || [];

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: WHITE, color: "#222" }}>

      {/* HERO - 1728x1117, single image, text centered */}
      <section style={{ position: "relative", width: "100%", minHeight: "clamp(400px, 64.6vw, 1117px)", overflow: "hidden", marginTop: -88 }}>
        {(s1?.image || s1?.images?.[0]) ? (
          <Image src={s1.image || s1.images?.[0] || ""} alt={s1?.title || ""} fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
        ) : null}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 80, paddingLeft: 20, paddingRight: 20, textAlign: "center" }}>
          <h1 style={{ color: WHITE, fontWeight: 800, fontSize: "clamp(28px, 4vw, 56px)", marginBottom: 14, lineHeight: 1.1 }}>
            {s1?.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(13px, 1.2vw, 16px)", maxWidth: 600, lineHeight: 1.75 }}>
            {s1?.body}
          </p>
        </div>
      </section>

      {/* WHO WE ARE - navy, cards left, image right */}
      <section style={{ background: NAVY, padding: "80px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ color: WHITE, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 32px)", marginBottom: 8 }}>{s2?.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 480, margin: "0 auto", lineHeight: 1.75 }}>{s2?.body}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 32, alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {whoWeAreItems.map((item: Item, i: number) => (
                <div key={i} style={{ background: WHY_CARD, borderRadius: 20, padding: "24px 28px" }}>
                  <h3 style={{ color: NAVY, fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ color: "#444", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "3/4", maxHeight: 520, width: "100%" }}>
              {s2?.image ? <Image src={s2.image} alt={s2.title || ""} fill style={{ objectFit: "cover" }} /> : null}
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION + CORE VALUES - white, image left */}
      <section style={{ background: WHITE, padding: "80px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48, alignItems: "flex-start" }}>
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "4/3", width: "100%" }}>
              {s3?.image ? <Image src={s3.image} alt={s3.title || ""} fill style={{ objectFit: "cover" }} /> : null}
            </div>
            <div>
              <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 30px)", marginBottom: 12 }}>{s3?.title}</h2>
              <p style={{ color: "#555", fontSize: "clamp(13px, 1.1vw, 14px)", lineHeight: 1.75, marginBottom: 32 }}>{s3?.body}</p>
              <h3 style={{ color: NAVY, fontWeight: 700, fontSize: "clamp(16px, 1.8vw, 20px)", marginBottom: 8 }}>{s5?.title}</h3>
              <p style={{ color: "#666", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>{s5?.body}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {coreValues.map((item: Item, i: number) => (
                  <div key={i} style={{ background: PEACH, borderRadius: 14, padding: "16px 20px", border: "1px solid rgba(229,136,37,0.15)" }}>
                    <h4 style={{ color: NAVY, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.title}</h4>
                    <p style={{ color: "#555", fontSize: 12, lineHeight: 1.65, margin: 0 }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* READY TO TRANSFORM */}
      <section style={{ background: PEACH, padding: "80px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 32px)", marginBottom: 12 }}>{s9?.title}</h2>
          <p style={{ color: "#555", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 480, margin: "0 auto 28px", lineHeight: 1.75 }}>{s9?.body}</p>
          {s9?.button ? (
            <Link href={s9.button.href} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: NAVY, color: WHITE, borderRadius: 100, fontWeight: 700, textDecoration: "none", fontSize: "clamp(13px, 1vw, 15px)", padding: "15px 40px" }}>
              {s9.button.title}
            </Link>
          ) : null}
        </div>
      </section>

    </div>
  );
}
