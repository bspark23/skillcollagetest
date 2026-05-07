import BlogDetailClient from "@/components/pages/blog-detail-client";

const SLUGS = [
  "empowering-youth-through-skills-development",
  "importance-of-msme-support",
  "research-for-development",
  "women-entrepreneurship-success-stories",
  "tech-skills-digital-economy",
  "partnership-for-development",
];

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
