"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BlogPage from "@/components/pages/blog-page";
import BlogDetailClient from "@/components/pages/blog-detail-client";

function BlogRouter() {
  const params = useSearchParams();
  const slug = params.get("slug");
  if (slug) return <BlogDetailClient />;
  return <BlogPage />;
}

export default function Blog() {
  return (
    <Suspense fallback={<div style={{ padding: 80, textAlign: "center" }}>Loading...</div>}>
      <BlogRouter />
    </Suspense>
  );
}
