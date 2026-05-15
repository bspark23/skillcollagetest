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

export default function ProgramsPage() {
  useContent();
  const { programs } = useAppSelector((s) => s.content.content.siteContent) as { programs?: { section1?: Section; section2?: Section; section8?: Section } };

  const s1 = programs?.section1 as Section | undefined;
  const s2 = programs?.section2 as Section | undefined;
  const s8 = programs?.section8 as Section | undefined;
  const programItems = (s2?.items || []) as Item[];

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: WHITE, color: "#222" }}>

      {/* HERO — slider image, text centered bottom */}
      <section style={{ position: "relative", width: "100%", minHeight: "clamp(380px, 64.6vw, 1117px)", overflow: "hidden", marginTop: -88 }}>
        {s1?.image ? (
          <Image
            src={s1.image}
            alt={s1.title || ""}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
        ) : null}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.48)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 80, paddingLeft: 20, paddingRight: 20, textAlign: "center" }}>
          <h1 style={{ color: WHITE, fontWeight: 800, fontSize: "clamp(28px, 4vw, 56px)", marginBottom: 14, lineHeight: 1.1 }}>
            {s1?.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(13px, 1.2vw, 16px)", maxWidth: 520, lineHeight: 1.75 }}>
            {s1?.body}
          </p>
        </div>
      </section>

      {/* TRANSFORM YOUR FUTURE — image left, programs list right */}
      <section style={{ background: WHITE, padding: "80px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48, alignItems: "flex-start" }}>

            {/* Left — image */}
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "3/4", width: "100%", maxHeight: 560 }}>
              {s2?.image ? (
                <Image
                  src={s2.image}
                  alt={s2.title || ""}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : null}
            </div>

            {/* Right — title + program cards */}
            <div>
              <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 30px)", marginBottom: 12 }}>
                {s2?.title}
              </h2>
              <p style={{ color: "#555", fontSize: "clamp(13px, 1.1vw, 14px)", lineHeight: 1.75, marginBottom: 28 }}>
                {s2?.body}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {programItems.map((card, i) => (
                  <div key={i} style={{ background: PEACH, borderRadius: 16, padding: "20px 24px", border: "1px solid rgba(229,136,37,0.15)" }}>
                    <h3 style={{ color: NAVY, fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{card.title}</h3>
                    <p style={{ color: "#555", fontSize: 13, lineHeight: 1.65, margin: "0 0 6px" }}>{card.body}</p>
                    {card.subtitle ? <span style={{ color: ORANGE, fontSize: 12, fontWeight: 600 }}>{card.subtitle}</span> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* READY TO TRANSFORM — #FEF5EC */}
      <section style={{ background: PEACH, padding: "80px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 32px)", marginBottom: 12 }}>
            {s8?.title}
          </h2>
          <p style={{ color: "#555", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.75 }}>
            {s8?.body}
          </p>
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
