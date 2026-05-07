"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { useContent } from "@/hooks/use-content";
import { Section } from "@/models/content";

const NAVY = "#01244A";
const ORANGE = "#E58825";
const PEACH = "#FEF5EC";
const WHITE = "#FFFFFF";

const DEFAULT_SERVICES = [
  {
    title: "Skills and Entrepreneurship Education",
    body: "Empowering individuals to start and grow businesses through market-driven skills and knowledge.",
    items: ["Vocational skills training in multiple disciplines","Business development and MSME support","Workforce readiness and career pathways"],
    cta: "Talk to us today - we can deliver these services in your location or to your team partners.",
  },
  {
    title: "Research and Evaluations",
    body: "Data-driven insights and rigorous evaluations to measure impact and inform strategic decisions.",
    items: ["Baseline, midline, and endline surveys","Monitoring and evaluation plans","Policy and program assessments"],
    cta: "Talk to us today - we can deliver these services in your location or to your team partners.",
  },
  {
    title: "Business Development and Management",
    body: "Strategic support to help organizations grow, manage operations, and achieve sustainable results.",
    items: ["Organizational development and strategy","Project management and reporting","Capacity building for NGOs and SMEs"],
    cta: "Talk to us today - we can deliver these services in your location or to your team partners.",
  },
];

export default function ServicesPage() {
  useContent();
  const { services } = useAppSelector((s) => s.content.content.siteContent);
  const s1 = services?.section1 as Section;
  const s8 = services?.section8 as Section;

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: WHITE, color: "#222" }}>

      <section style={{ position: "relative", width: "100%", minHeight: "clamp(380px, 64.6vw, 1117px)", overflow: "hidden", marginTop: -88 }}>
        <Image src="/images/our-services/skill-college-our-services-img.png" alt="Our Services" fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.48)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 80, paddingLeft: 20, paddingRight: 20, textAlign: "center" }}>
          <h1 style={{ color: WHITE, fontWeight: 800, fontSize: "clamp(28px, 4vw, 56px)", marginBottom: 14, lineHeight: 1.1 }}>{s1?.title || "Our Services"}</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(13px, 1.2vw, 16px)", maxWidth: 560, lineHeight: 1.75 }}>{s1?.body || "Comprehensive solutions designed to empower individuals, strengthen organizations, and drive sustainable development."}</p>
        </div>
      </section>

      <section style={{ background: WHITE, padding: "80px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 32px)", marginBottom: 8 }}>Services We Offer</h2>
            <p style={{ color: "#666", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 480, margin: "0 auto", lineHeight: 1.75 }}>Comprehensive solutions tailored to empower individuals, businesses, and organizations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 48, alignItems: "flex-start" }}>
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "3/4", width: "100%", maxHeight: 600 }}>
              <Image src="/images/services-we-offer/skill-college-services-we-offer-img.png" alt="Services We Offer" fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {DEFAULT_SERVICES.map((svc, i) => (
                <div key={i}>
                  <h3 style={{ color: ORANGE, fontWeight: 800, fontSize: "clamp(16px, 1.8vw, 20px)", marginBottom: 8 }}>{svc.title}</h3>
                  <p style={{ color: "#555", fontSize: 13, lineHeight: 1.75, marginBottom: 12 }}>{svc.body}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 6 }}>
                    {svc.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, color: "#444", fontSize: 13 }}>
                        <span style={{ color: ORANGE, fontWeight: 700, flexShrink: 0 }}>&#10003;</span>{item}
                      </li>
                    ))}
                  </ul>
                  <p style={{ color: "#888", fontSize: 12, fontStyle: "italic", lineHeight: 1.6 }}>{svc.cta}</p>
                  {i < DEFAULT_SERVICES.length - 1 && <div style={{ height: 1, background: "rgba(1,36,74,0.08)", marginTop: 24 }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: PEACH, padding: "80px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(20px, 2.5vw, 32px)", marginBottom: 12 }}>{s8?.title || "Ready to Transform Your Future?"}</h2>
          <p style={{ color: "#555", fontSize: "clamp(13px, 1.1vw, 14px)", maxWidth: 500, margin: "0 auto 28px", lineHeight: 1.75 }}>{s8?.body || "Join hundreds of individuals and organizations who have benefited from our programs and services."}</p>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: NAVY, color: WHITE, borderRadius: 100, fontWeight: 700, textDecoration: "none", fontSize: "clamp(13px, 1vw, 15px)", padding: "15px 40px" }}>
            {s8?.button?.title || "Get Started Today"} <span>&#8594;</span>
          </Link>
        </div>
      </section>

    </div>
  );
}