import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailsPage from "@/components/pages/blog-details-page";
import type { Post } from "@/models/post";
import { PostService } from "@/services/post.service";

export const dynamic = "force-dynamic";

type Params = { slug: string };

async function fetchPost(slug: string): Promise<Post | null> {
  try {
    return await PostService.getPostBySlug(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params | Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchPost(slug);

  if (!blog) {
    return {
      title: "Blog post not found",
      description: "The requested blog post could not be found",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    keywords: blog.tags?.length ? blog.tags.map((tag) => tag.name) : [],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [
        {
          url: blog.featuredMedia.url,
          width: blog.featuredMedia.width,
          height: blog.featuredMedia.height,
          alt: blog.featuredMedia.alt || blog.title,
        },
      ],
    },
    twitter: {
      title: blog.title,
      description: blog.excerpt,
      images: [
        {
          url: blog.featuredMedia.url,
          width: blog.featuredMedia.width,
          height: blog.featuredMedia.height,
          alt: blog.featuredMedia.alt,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  // Return empty array to allow dynamic generation on-demand
  return [];
}

export default async function BlogSlugPage({
  params,
}: {
  params: Params | Promise<Params>;
}) {
  const { slug } = await params;
  const blog = await fetchPost(slug);

  if (!blog) return notFound();

  return <BlogDetailsPage post={blog} />;
}
