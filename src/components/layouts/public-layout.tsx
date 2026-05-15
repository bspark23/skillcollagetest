"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { useContent } from "@/hooks/use-content";
import { Link as NavLink } from "@/models/settings";
import { useState, useEffect } from "react";
import { Menu, X, MessageCircle, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";

const NAVY = "#01244A";
const ORANGE = "#E58825";
const WHITE = "#FFFFFF";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  useContent();
  const pathname = usePathname();
  const { systemSettings } = useAppSelector((state) => state.content.content);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = systemSettings?.headerLinks || [];
  const socialLinks = systemSettings?.socialLinks || [];
  const footerLinks = systemSettings?.footerLinks || [];
  const logoSrc = systemSettings?.siteLogo || "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  const socialIcon = (icon: string) => {
    if (icon === "whatsapp") return <MessageCircle size={14} />;
    if (icon === "linkedin") return <Linkedin size={14} />;
    if (icon === "instagram") return <Instagram size={14} />;
    if (icon === "facebook") return <Facebook size={14} />;
    return <Twitter size={14} />;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: WHITE }}>

      {/* MOBILE MENU — peach bg, navy text */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "#FEF5EC", display: "flex", flexDirection: "column", padding: "32px 28px 48px", overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48 }}>
            <Link href="/" onClick={() => setMobileOpen(false)}>
              {logoSrc ? (
                <Image src={logoSrc} alt={systemSettings?.siteName || ""} width={120} height={36} style={{ objectFit: "contain" }} />
              ) : (
                <span style={{ color: NAVY, fontSize: 16, fontWeight: 800 }}>
                  {systemSettings?.siteName}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <X size={28} color={NAVY} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {navLinks.map((link: NavLink, i: number) =>
              link.isButton ? (
                <Link key={i} href={link.href} onClick={() => setMobileOpen(false)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 56, borderRadius: 100, background: NAVY, color: WHITE, fontSize: 16, fontWeight: 600, textDecoration: "none" }}>
                  {link.label}
                </Link>
              ) : (
                <Link key={i} href={link.href} onClick={() => setMobileOpen(false)}
                  style={{ color: isActive(link.href) ? ORANGE : NAVY, fontSize: 22, fontWeight: 400, textDecoration: "none" }}>
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}

      {/* NAVBAR — floating white pill, pushed down 20px, wider */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: "20px 40px 0", pointerEvents: "none" }}>
        <div style={{
          maxWidth: 1000,
          margin: "0 auto",
          height: 68,
          background: WHITE,
          borderRadius: 100,
          boxShadow: scrolled ? "0 8px 40px rgba(1,36,74,0.18)" : "0 4px 24px rgba(1,36,74,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          gap: 24,
          pointerEvents: "auto",
          transition: "box-shadow 0.3s",
        }}>
          <Link href="/" style={{ flexShrink: 0, textDecoration: "none", display: "flex", alignItems: "center" }}>
            {logoSrc ? (
              <Image src={logoSrc} alt={systemSettings?.siteName || ""} width={110} height={34} style={{ objectFit: "contain" }} priority />
            ) : (
              <span style={{ color: NAVY, fontSize: 16, fontWeight: 800 }}>
                {systemSettings?.siteName}
              </span>
            )}
          </Link>

          <ul className="hidden md:flex" style={{ listStyle: "none", margin: 0, padding: 0, gap: 28, alignItems: "center", flex: 1, justifyContent: "center" }}>
            {navLinks.filter((l: NavLink) => !l.isButton).map((link: NavLink, i: number) => (
              <li key={i}>
                <Link href={link.href} style={{ color: isActive(link.href) ? ORANGE : NAVY, fontSize: 14, textDecoration: "none", fontWeight: isActive(link.href) ? 700 : 400, transition: "color 0.2s" }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex" style={{ flexShrink: 0 }}>
            {navLinks.filter((l: NavLink) => l.isButton).map((link: NavLink, i: number) => (
              <Link key={i} href={link.href}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 44, borderRadius: 100, paddingLeft: 28, paddingRight: 28, background: ORANGE, color: WHITE, fontSize: 14, fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
                {link.label}
              </Link>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}>
            <Menu size={24} color={NAVY} />
          </button>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main style={{ flex: 1 }}>{children}</main>

      {/* FOOTER — white */}
      <footer style={{ background: WHITE, borderTop: "1px solid rgba(1,36,74,0.08)" }}>
        <div style={{ maxWidth: 1728, margin: "0 auto", padding: "56px 20px 32px" }} className="md:px-[120px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <div style={{ marginBottom: 16 }}>
                {logoSrc ? (
                  <Image src={logoSrc} alt={systemSettings?.siteName || ""} width={120} height={36} style={{ objectFit: "contain" }} />
                ) : (
                  <span style={{ color: NAVY, fontSize: 16, fontWeight: 800 }}>
                    {systemSettings?.siteName}
                  </span>
                )}
              </div>
              <p style={{ color: "#666", fontSize: 12, lineHeight: 1.8, maxWidth: 220, marginBottom: 20 }}>
                {systemSettings?.siteDescription}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {socialLinks.map((s: NavLink) => (
                  <Link key={s.label} href={s.href} aria-label={s.label}
                    style={{ width: 32, height: 32, borderRadius: "50%", background: ORANGE, color: WHITE, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {socialIcon(s.icon?.toLowerCase() || "")}
                  </Link>
                ))}
              </div>
            </div>
            {footerLinks.map((section, si) => (
              <div key={si}>
                <h4 style={{ color: NAVY, fontSize: 13, fontWeight: 700, marginBottom: 20, textTransform: "uppercase", letterSpacing: "0.08em" }}>{section.section}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {section.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} style={{ color: "#666", fontSize: 13, textDecoration: "none" }}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid rgba(1,36,74,0.08)", background: "#01244A", margin: "40px -20px -32px", padding: "20px 20px", display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }} className="md:flex-row md:justify-between md:px-[120px]">
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, textAlign: "center" }}>
              {systemSettings?.siteName ? `2026 ${systemSettings.siteName}. All rights reserved.` : ""}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
