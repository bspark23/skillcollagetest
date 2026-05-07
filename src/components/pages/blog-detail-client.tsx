"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPostBySlug, fetchPosts } from "@/store/slices/blog-slice";
import { Post } from "@/models/post";

const NAVY = "#01244A";
const ORANGE = "#E58825";
const PEACH = "#FEF5EC";
const WHITE = "#FFFFFF";

const DEFAULT_POSTS = [
  { id: "1", slug: "empowering-youth-through-skills-development", title: "Empowering Youth Through Skills Development", excerpt: "Discover how targeted skills training is transforming livelihoods and creating economic opportunities for young people.", content: "<p>Skills development is one of the most powerful tools for economic empowerment. At Skill College and Enterprise Ltd, we have seen firsthand how targeted training programs can transform lives, create jobs, and build resilient communities.</p><p>Our programs are designed to be practical, market-driven, and accessible. We work closely with employers, government agencies, and development partners to ensure our graduates have the skills that are actually in demand.</p><p>From vocational training to digital skills, entrepreneurship support to research services, we are committed to bridging the gap between education and employment across Nigeria and beyond.</p>", image: "/images/blog-&-insight/skill-college-blog-&-insight-img1.png", date: "May 20, 2025", author: "Skill College Team" },
  { id: "2", slug: "importance-of-msme-support", title: "The Importance of MSME Support for Economic Recovery", excerpt: "The development of micro, small and medium enterprises plays a critical role in economic recovery.", content: "<p>Micro, small and medium enterprises (MSMEs) are the backbone of Nigeria economy, accounting for over 96% of businesses and 84% of employment. Yet they face significant challenges in accessing finance, markets, and business development support.</p><p>At Skill College, our MSME support programs provide entrepreneurs with the tools, knowledge, and networks they need to grow sustainable businesses. We offer business planning, financial literacy, market linkages, and ongoing mentorship.</p>", image: "/images/blog-&-insight/skill-college-blog-&-insight-img2.png", date: "May 18, 2025", author: "Skill College Team" },
  { id: "3", slug: "research-for-development", title: "Research for Development: Measuring What Matters", excerpt: "Why rigorous research and evaluation frameworks are essential for development organizations.", content: "<p>In the development sector, evidence matters. Organizations that invest in rigorous research and evaluation are better positioned to understand what works, improve their programs, and demonstrate impact to funders and stakeholders.</p><p>Our research services team at Skill College provides comprehensive monitoring and evaluation support, including baseline surveys, midline assessments, endline evaluations, and policy research. We use both quantitative and qualitative methods to capture the full picture of program impact.</p>", image: "/images/blog-&-insight/skill-college-blog-&-insight-img3.png", date: "May 15, 2025", author: "Skill College Team" },
  { id: "4", slug: "women-entrepreneurship-success-stories", title: "Women Entrepreneurship: Success Stories from Our Programs", excerpt: "Inspiring stories of women who have transformed their lives through our entrepreneurship programs.", content: "<p>Women entrepreneurs are driving economic growth and social change across Nigeria. Through our targeted women entrepreneurship programs, we have supported hundreds of women to start and grow businesses in sectors ranging from fashion and food to technology and agriculture.</p><p>These programs provide not just business skills, but also confidence, networks, and access to finance. The results speak for themselves: our graduates report significant increases in income, employment creation, and household wellbeing.</p>", image: "/images/blog-&-insight/skill-college-blog-&-insight-img4.png", date: "May 12, 2025", author: "Skill College Team" },
  { id: "5", slug: "tech-skills-digital-economy", title: "Tech Skills for the Digital Economy: What You Need to Know", excerpt: "Demand for digital skills has never been higher. Here is how to position yourself for digital opportunities.", content: "<p>The digital economy is creating new opportunities for skilled workers across Africa. From software development and data analysis to digital marketing and e-commerce, the demand for tech-savvy professionals is growing rapidly.</p><p>At Skill College, our tech skills programs are designed to equip participants with the practical digital skills they need to access these opportunities. Our curriculum is developed in partnership with industry leaders and updated regularly to reflect the latest trends and technologies.</p>", image: "/images/blog-&-insight/skill-college-blog-&-insight-img5.png", date: "May 10, 2025", author: "Skill College Team" },
  { id: "6", slug: "partnership-for-development", title: "Partnership for Development: Creating Shared Value", excerpt: "How strategic partnerships between organizations and communities are generating sustainable shared value.", content: "<p>Sustainable development requires collaboration. No single organization can address the complex challenges of poverty, unemployment, and inequality alone. That is why partnership is at the heart of everything we do at Skill College.</p><p>We work with UN agencies, international NGOs, government bodies, private sector companies, and community organizations to design and deliver programs that create shared value for all stakeholders. Our partnership model is built on mutual respect, clear accountability, and a shared commitment to impact.</p>", image: "/images/blog-&-insight/skill-college-blog-&-insight-img6.png", date: "May 8, 2025", author: "Skill College Team" },
];

export default function BlogDetailClient() {
  const params = useParams();
  const slug = params?.slug as string;
  const dispatch = useAppDispatch();
  const { currentPost, posts, isLoading } = useAppSelector((s) => s.blog);

  useEffect(() => {
    if (slug) dispatch(fetchPostBySlug({ slug }));
    if (!posts.length) dispatch(fetchPosts({}));
  }, [slug, dispatch]);

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }); }
    catch { return d; }
  };

  const fallback = DEFAULT_POSTS.find((p) => p.slug === slug) || DEFAULT_POSTS[0];
  const post = currentPost || null;

  const title = post?.title || fallback.title;
  const excerpt = post?.excerpt || fallback.excerpt;
  const content = post?.content || fallback.content;
  const image = post?.featuredMedia?.url || fallback.image;
  const date = post ? (post.publishedAt || post.createdAt) : fallback.date;
  const author = post?.author?.name || fallback.author;

  const related = posts.length > 0
    ? posts.filter((p: Post) => p.slug !== slug).slice(0, 3).map((p: Post) => ({ slug: p.slug, title: p.title, image: p.featuredMedia?.url || "", date: p.publishedAt || p.createdAt }))
    : DEFAULT_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div style={{ fontFamily: "var(--font-inter), sans-serif", background: WHITE }}>

      <section style={{ position: "relative", width: "100%", minHeight: "clamp(320px, 40vw, 560px)", overflow: "hidden", marginTop: -88 }}>
        {image && <Image src={image} alt={title} fill style={{ objectFit: "cover", objectPosition: "center" }} priority />}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.52)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 60, paddingLeft: 20, paddingRight: 20, textAlign: "center" }}>
          <div style={{ marginBottom: 12 }}>
            <Link href="/blog" style={{ color: ORANGE, fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Blog & Insights</Link>
            <span style={{ color: "rgba(255,255,255,0.5)", margin: "0 8px" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>{title}</span>
          </div>
          <h1 style={{ color: WHITE, fontWeight: 800, fontSize: "clamp(22px, 3.5vw, 48px)", marginBottom: 12, lineHeight: 1.15, maxWidth: 800 }}>{title}</h1>
          <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>{author}</span>
            <span style={{ color: "rgba(255,255,255,0.4)" }}>|</span>
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>{formatDate(date)}</span>
          </div>
        </div>
      </section>

      <section style={{ background: WHITE, padding: "72px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#999" }}>Loading...</div>
          ) : (
            <>
              <p style={{ color: "#555", fontSize: "clamp(14px, 1.3vw, 16px)", lineHeight: 1.85, marginBottom: 32, fontStyle: "italic", borderLeft: `4px solid ${ORANGE}`, paddingLeft: 20 }}>{excerpt}</p>
              <div style={{ color: "#333", fontSize: "clamp(14px, 1.2vw, 15px)", lineHeight: 1.9 }} dangerouslySetInnerHTML={{ __html: content }} />
            </>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section style={{ background: "#f9f9f9", padding: "72px 20px", boxSizing: "border-box" }} className="md:px-[120px]">
          <div style={{ maxWidth: 1728, margin: "0 auto" }}>
            <h2 style={{ color: NAVY, fontWeight: 800, fontSize: "clamp(18px, 2vw, 26px)", marginBottom: 32, textAlign: "center" }}>Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
              {related.map((p, i) => (
                <Link key={i} href={`/blog/${p.slug}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", background: WHITE, border: "1px solid rgba(1,36,74,0.08)" }}>
                  <div style={{ position: "relative", height: 180, background: "#e8e8e8", flexShrink: 0 }}>
                    {p.image && <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }} />}
                  </div>
                  <div style={{ padding: "16px 18px 20px" }}>
                    <h3 style={{ color: NAVY, fontWeight: 700, fontSize: 13, lineHeight: 1.45, margin: "0 0 8px" }}>{p.title}</h3>
                    <span style={{ color: ORANGE, fontSize: 12, fontWeight: 600 }}>Read more</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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