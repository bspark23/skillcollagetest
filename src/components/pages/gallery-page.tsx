"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPosts } from "@/store/slices/blog-slice";
import { Post } from "@/models/post";
import { useContent } from "@/hooks/use-content";

const GALLERY_CATEGORIES = ["kitchen-setups", "catering-events", "event-decorations", "equipment"];

const DEFAULT_GALLERY = [
  { id: "1", slug: "luxury-hotel-kitchen-installation", title: "Luxury Hotel Kitchen Installation", excerpt: "Complete kitchen setup and equipment installation for a 5-star luxury hotel.", category: { name: "Kitchen Setups", slug: "kitchen-setups" }, image: "/Images/premier-hospitality-ourportfolio/premier-hospitality-ourportfolio-img1.png" },
  { id: "2", slug: "elegant-wedding-decoration", title: "Elegant Wedding Decoration", excerpt: "Stunning venue transformation for an elegant wedding celebration.", category: { name: "Event Decorations", slug: "event-decorations" }, image: "/Images/premier-hospitality-ourportfolio/premier-hospitality-ourportfolio-img2.png" },
  { id: "3", slug: "corporate-catering-event", title: "Corporate Catering Event", excerpt: "Premium catering services for a corporate gathering of 500+ guests.", category: { name: "Catering Events", slug: "catering-events" }, image: "/Images/premier-hospitality-ourportfolio/premier-hospitality-ourportfolio-img3.png" },
  { id: "4", slug: "commercial-kitchen-equipment", title: "Commercial Kitchen Equipment", excerpt: "Industrial equipment supply and installation for a restaurant chain.", category: { name: "Equipment", slug: "equipment" }, image: "/Images/premier-hospitality-ourportfolio/premier-hospitality-ourportfolio-img4.png" },
  { id: "5", slug: "fine-dining-restaurant-kitchen", title: "Fine Dining Restaurant Kitchen", excerpt: "Bespoke kitchen design for a fine dining establishment.", category: { name: "Kitchen Setups", slug: "kitchen-setups" }, image: "/Images/premier-hospitality-ourportfolio/premier-hospitality-ourportfolio-img5.jpg" },
  { id: "6", slug: "premium-property-interior", title: "Premium Property Interior", excerpt: "Luxury hospitality property interior design and setup.", category: { name: "Equipment", slug: "equipment" }, image: "/Images/premier-hospitality-ourportfolio/premier-hospitality-ourportfolio-img6.jpg" },
];

export default function GalleryPage() {
  useContent();
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((s) => s.blog);
  const [activeCategory, setActiveCategory] = useState("ALL PROJECTS");

  useEffect(() => { dispatch(fetchPosts({})); }, [dispatch]);

  const galleryPosts = posts.filter(p =>
    GALLERY_CATEGORIES.includes((p.category?.slug || "").toLowerCase())
  );
  const allGallery = galleryPosts.length > 0 ? galleryPosts : DEFAULT_GALLERY;

  const categories = ["ALL PROJECTS", "KITCHEN SETUPS", "CATERING EVENTS", "EVENT DECORATIONS", "EQUIPMENT"];

  const filtered = activeCategory === "ALL PROJECTS"
    ? allGallery
    : allGallery.filter(p => {
        const cat = (p.category?.name || "").toUpperCase();
        return cat === activeCategory;
      });

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: "#0a0a0a", color: "#fff" }}>
      {/* HERO */}
      <section className="relative w-full flex items-center justify-center overflow-hidden -mt-[72px] pt-[72px]" style={{ height: "350px", background: "linear-gradient(90deg, #000000 0%, #18181B 50%, #000000 100%)" }}>
        <div className="relative z-10 text-center px-5">
          <h1 className="text-white font-bold leading-tight mb-3" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
            Our <span style={{ color: "#FEC700" }}>Portfolio</span>
          </h1>
          <p className="text-white/90 max-w-[600px] mx-auto leading-relaxed" style={{ fontSize: "clamp(13px, 1.5vw, 15px)" }}>
            Comprehensive hospitality solutions designed to elevate your business and exceed expectations.
          </p>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="bg-[#0a0a0a] py-20 px-5 md:px-[120px]">
        <div className="max-w-[1728px] mx-auto">
          {/* Category Filter */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all"
                style={{
                  background: activeCategory === cat ? "linear-gradient(90deg, #FEC700 0%, #D08602 100%)" : "transparent",
                  color: activeCategory === cat ? "#000" : "#FEC700",
                  border: `2px solid ${activeCategory === cat ? "transparent" : "#FEC700"}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((item: any, i: number) => {
              const isPost = "featuredMedia" in item;
              const img = isPost ? item.featuredMedia?.url : item.image;
              const title = item.title;
              const excerpt = isPost ? item.excerpt : item.excerpt;
              return (
                <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer" style={{ height: "clamp(250px, 35vw, 320px)" }}>
                  {img && <Image src={img} alt={title} fill style={{ objectFit: "cover" }} />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-black/90 transition-all" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold mb-2" style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}>{title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{excerpt}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 md:px-[120px]" style={{ background: "linear-gradient(90deg, #FEC700 0%, #D08602 100%)" }}>
        <div className="max-w-[1728px] mx-auto text-center">
          <h2 className="text-black font-bold mb-4" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            Ready to Transform Your Hospitality Experience?
          </h2>
          <p className="text-black leading-relaxed max-w-[600px] mx-auto mb-8" style={{ fontSize: "clamp(14px, 1.5vw, 16px)" }}>
            Let's work together to create exceptional experiences that exceed expectations.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-black text-[#FEC700] rounded-full font-bold no-underline gap-2 uppercase tracking-wide" style={{ padding: "clamp(16px, 2vw, 24px) clamp(40px, 8vw, 80px)", fontSize: "clamp(14px, 1.5vw, 16px)" }}>
            START A PROJECT TODAY →
          </Link>
        </div>
      </section>
    </div>
  );
}
