"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Item, Section } from "@/models/content";
import { Post } from "@/models/post";
import { Home, MapPin, Bed, Bath, ChevronRight } from "lucide-react";

const PROPERTY_IMAGES = [
  "/images/property/Realist-Realty-Ltd-discover-a-world-of-possibilities-img1.png",
  "/images/property/Realist-Realty-Ltd-discover-a-world-of-possibilities-img2.png",
  "/images/property/Realist-Realty-Ltd-discover-a-world-of-possibilities-img3.png",
  "/images/property/Realist-Realty-Ltd-discover-a-world-of-possibilities-img4.png",
  "/images/property/Realist-Realty-Ltd-discover-a-world-of-possibilities-img5.png",
  "/images/property/Realist-Realty-Ltd-discover-a-world-of-possibilities-img6.png",
];

export const DEFAULT_CAROUSEL_ITEMS: Item[] = [
  { title: "Luxury Villa in Maitama", subtitle: "₦550,000,000", body: "Maitama, Abuja", image: PROPERTY_IMAGES[0], href: "/properties?slug=luxury-villa-maitama", thumbnail: "4-Bedroom|3-Bathroom|Villa", video: "A stunning 4-bedroom villa in a peaceful suburban neighborhood." },
  { title: "Modern Apartment in Asokoro", subtitle: "₦550,000,000", body: "Asokoro, Abuja", image: PROPERTY_IMAGES[1], href: "/properties?slug=modern-apartment-asokoro", thumbnail: "2-Bedroom|2-Bathroom|Apartment", video: "A chic fully-furnished 2-bedroom apartment with panoramic city views." },
  { title: "Executive Penthouse", subtitle: "₦550,000,000", body: "Wuse 2, Abuja", image: PROPERTY_IMAGES[2], href: "/properties?slug=executive-penthouse-wuse", thumbnail: "3-Bedroom|3-Bathroom|Villa", video: "An elegant 3-bedroom townhouse in a gated community." },
  { title: "Detached Duplex in Jabi", subtitle: "₦320,000,000", body: "Jabi, Abuja", image: PROPERTY_IMAGES[3], href: "/properties?slug=detached-duplex-jabi", thumbnail: "5-Bedroom|4-Bathroom|Duplex", video: "A spacious 5-bedroom detached duplex in the heart of Jabi." },
  { title: "Semi-Detached in Gwarinpa", subtitle: "₦180,000,000", body: "Gwarinpa, Abuja", image: PROPERTY_IMAGES[4], href: "/properties?slug=semi-detached-gwarinpa", thumbnail: "3-Bedroom|2-Bathroom|Semi-Detached", video: "A well-finished 3-bedroom semi-detached house in Gwarinpa estate." },
  { title: "Prime Land in Katampe", subtitle: "₦95,000,000", body: "Katampe, Abuja", image: PROPERTY_IMAGES[5], href: "/properties?slug=prime-land-katampe", thumbnail: "Land|1000sqm|Residential", video: "A prime 1000sqm residential plot in the fast-developing Katampe area." },
];

interface Props {
  section?: Section;
  posts?: Post[];
  innerCls: string;
  showViewAll?: boolean;
}

export default function FeaturedCarousel({ section, posts = [], innerCls, showViewAll = true }: Props) {
  const [current, setCurrent] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const GAP = 32;

  const items: Item[] = posts.length > 0
    ? posts
        .filter(p => {
          // Only show property posts, not blog articles
          const cat = (p.category?.slug || "").toLowerCase();
          return ["villa", "apartment", "duplex", "land", "commercial", "property"].includes(cat);
        })
        .map(p => ({
        title: p.title,
        subtitle: (p.meta as unknown as Record<string, string>)?.price || "Contact for Price",
        body: (p.meta as unknown as Record<string, string>)?.location || p.category?.name || "Abuja",
        image: p.featuredMedia?.url || "",
        href: `/properties?slug=${p.slug}`,
        thumbnail: `${(p.meta as unknown as Record<string, string>)?.beds || "3"}-Bedroom|${(p.meta as unknown as Record<string, string>)?.baths || "2"}-Bathroom|${p.category?.name || "Property"}`,
        video: p.excerpt || "",
      }))
    : (section?.items?.length ? section.items : DEFAULT_CAROUSEL_ITEMS);

    const total = items.length;
  const [visibleCount, setVisibleCount] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const maxIndex = Math.max(0, total - visibleCount);

  useEffect(() => {
    const measure = () => { if (cardRef.current) setCardWidth(cardRef.current.offsetWidth + GAP); };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1));

  return (
    <section style={{ background: "#F5F5F4", paddingTop: 64, paddingBottom: 64 }}>
      <div className={innerCls}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div style={{ maxWidth: 560 }}>
            <h2 style={{ color: "#10106A", fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 800, marginBottom: 10 }}>
              {section?.title || "Featured Properties"}
            </h2>
            <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              {section?.body || "Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Realist Realty."}
            </p>
          </div>
          {showViewAll && (
            <Link href="/properties" style={{ display: "inline-flex", alignItems: "center", background: "#10106A", color: "#fff", padding: "14px 28px", borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
              View All Properties
            </Link>
          )}
        </div>

        {/* Cards track */}
        <div style={{ overflow: "hidden" }}>
          <div style={{
            display: "flex",
            gap: GAP,
            transition: cardWidth ? "transform 0.45s cubic-bezier(0.4,0,0.2,1)" : "none",
            transform: cardWidth ? `translateX(-${current * cardWidth}px)` : "translateX(0)",
            willChange: "transform",
          }}>
            {items.map((item: Item, i: number) => {
              const tags = (item.thumbnail || "4-Bedroom|3-Bathroom|Villa").split("|");
              return (
                <div ref={i === 0 ? cardRef : undefined} key={i} style={{
                  flexShrink: 0,
                  width: `calc((100% - ${(visibleCount - 1) * GAP}px) / ${visibleCount})`,
                  minWidth: 260,
                  minHeight: 500,
                  borderRadius: 24,
                  border: "1px solid #e5e7eb",
                  background: "#fff",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}>
                  <div style={{ height: "clamp(200px, 30vw, 340px)", flexShrink: 0, backgroundImage: item.image ? `url('${item.image}')` : "none", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: item.image ? undefined : "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {!item.image && <Home size={48} color="#93c5fd" />}
                  </div>
                  <div style={{ flex: 1, padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <h3 style={{ color: "#10106A", fontSize: 18, fontWeight: 800, marginBottom: 6, lineHeight: 1.3 }}>{item.title}</h3>
                      <p style={{ color: "#6b7280", fontSize: 12, lineHeight: 1.6, marginBottom: 10 }}>{item.video || "A stunning property in a peaceful neighborhood..."}</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#6b7280", fontSize: 12, marginBottom: 14 }}>
                        <MapPin size={13} color="#2563eb" /> {item.body}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                        {tags.map((tag, t) => (
                          <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#f3f4f6", color: "#374151", fontSize: 11, fontWeight: 500, padding: "5px 12px", borderRadius: 100, border: "1px solid #e5e7eb" }}>
                            {t === 0 && <Bed size={11} />}{t === 1 && <Bath size={11} />}{t === 2 && <Home size={11} />} {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ color: "#9ca3af", fontSize: 11, marginBottom: 2 }}>Price</div>
                        <div style={{ color: "#10106A", fontSize: 16, fontWeight: 800 }}>{item.subtitle || "₦550,000,000"}</div>
                      </div>
                      <Link href={item.href || "/properties"} style={{ display: "inline-flex", alignItems: "center", background: "#10106A", color: "#fff", padding: "11px 20px", borderRadius: 100, fontSize: 12, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                        View Property Detail
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer: counter + arrows */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 32, paddingTop: 24, borderTop: "1px solid #e5e7eb" }}>
          <span style={{ color: "#10106A", fontSize: 13, fontWeight: 600 }}>
            {String(current + 1).padStart(2, "0")} of {String(total).padStart(2, "0")}
          </span>
          <div style={{ display: "flex", gap: 12 }}>
            <button onClick={prev} disabled={current === 0}
              style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid #d1d5db", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: current === 0 ? "not-allowed" : "pointer", opacity: current === 0 ? 0.4 : 1, transition: "all 0.2s" }}>
              <ChevronRight size={18} style={{ transform: "rotate(180deg)" }} color="#374151" />
            </button>
            <button onClick={next} disabled={current >= maxIndex}
              style={{ width: 44, height: 44, borderRadius: "50%", border: "none", background: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", cursor: current >= maxIndex ? "not-allowed" : "pointer", opacity: current >= maxIndex ? 0.5 : 1, transition: "all 0.2s" }}>
              <ChevronRight size={18} color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


