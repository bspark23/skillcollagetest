"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { useContent } from "@/hooks/use-content";
import { SubscriberService } from "@/services/subscriber.service";
import { Item, Section } from "@/models/content";

const NAVY = "#01244A";
const ORANGE = "#E58825";
const PEACH = "#FEF5EC";
const WHITE = "#FFFFFF";

export default function ContactPage() {
  useContent();
  const { systemSettings } = useAppSelector((s) => s.content.content);
  const { contact: contactContent } = useAppSelector((s) => s.content.content.siteContent);
  const contactInfo = systemSettings?.contact;
  const s1 = contactContent?.section1 as Section;
  const s2 = contactContent?.section2 as Section;
  const s8 = contactContent?.section8 as Section;

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) { setError("Full name and email are required."); return; }
    setSending(true); setError("");
    try {
      // Format phone: remove spaces and ensure it starts with +
      let phone = form.phone?.trim();
      if (phone && !phone.startsWith('+')) {
        phone = '+' + phone.replace(/\s+/g, '');
      } else if (phone) {
        phone = phone.replace(/\s+/g, '');
      }
      
      await SubscriberService.subscribe({ 
        name: form.name, 
        email: form.email, 
        phone: phone || undefined, 
        type: "enquiry", 
        metadata: { message: form.message } 
      });
      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (err) { 
      console.error('Subscription error:', err);
      setError("Failed to send. Please try again."); 
    }
    finally { setSending(false); }
  };

  const inputStyle: React.CSSProperties = { width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #ddd", fontSize: 14, color: "#333", outline: "none", boxSizing: "border-box", background: WHITE, fontFamily: "inherit" };
  const contactItems = (s2?.items || []).map((item: Item) => {
    const label = item.title || "";
    const lines = (item.body || "").split("\n").filter(Boolean);
    const labelLower = label.toLowerCase();
    const icon = (labelLower.includes("address") ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
    ) : labelLower.includes("phone") ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    ) : labelLower.includes("email") ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={WHITE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ));
    return { icon, label, lines };
  });

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: WHITE }}>

      <section style={{ position: "relative", width: "100%", minHeight: "clamp(380px, 64.6vw, 1117px)", overflow: "hidden", marginTop: -88 }}>
        {s1?.image ? (
          <Image src={s1.image} alt={s1.title || ""} fill style={{ objectFit: "cover", objectPosition: "center" }} priority />
        ) : null}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.48)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 80, paddingLeft: 20, paddingRight: 20, textAlign: "center" }}>
          <h1 style={{ color: WHITE, fontWeight: 800, fontSize: "clamp(28px, 4vw, 56px)", marginBottom: 14, lineHeight: 1.1 }}>{s1?.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(13px, 1.2vw, 16px)", maxWidth: 520, lineHeight: 1.75 }}>{s1?.body}</p>
        </div>
      </section>

      <section style={{ background: WHITE, padding: "80px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto" }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 60, alignItems: "flex-start" }}>

            <div>
              <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(18px, 2vw, 24px)", marginBottom: 6 }}>{s2?.title}</h2>
              <p style={{ color: "#666", fontSize: 13, lineHeight: 1.75, marginBottom: 36 }}>{s2?.body}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {contactItems.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingBottom: 24, marginBottom: 24, borderBottom: i < contactItems.length - 1 ? "1px solid rgba(1,36,74,0.08)" : "none" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ color: ORANGE, fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
                      {item.lines.map((line, j) => (
                        <div key={j} style={{ color: "#555", fontSize: 13, lineHeight: 1.65 }}>{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", color: "#555", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Full name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Full name" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#555", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="Email" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#555", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Phone number</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="+2348012345678" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", color: "#555", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Message</label>
                  <textarea rows={5} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} placeholder="Type your message..." style={{ ...inputStyle, resize: "vertical" }} />
                </div>
                {error && <p style={{ color: "#ef4444", fontSize: 12, margin: 0 }}>{error}</p>}
                <button type="submit" disabled={sending} style={{ background: NAVY, color: WHITE, padding: "16px", borderRadius: 8, fontSize: 14, fontWeight: 700, border: "none", cursor: sending ? "not-allowed" : "pointer", opacity: sending ? 0.7 : 1, width: "100%" }}>
                  {sending ? "Sending..." : sent ? "Message Sent!" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: WHITE, padding: "0 20px 80px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 1728, margin: "0 auto" }}>
          {contactInfo?.map ? (
            <div style={{ borderRadius: 16, overflow: "hidden", height: 280, border: "1px solid rgba(1,36,74,0.08)" }}>
              <iframe
                src={contactInfo.map}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={systemSettings?.siteName || "Map"}
              />
            </div>
          ) : null}
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
