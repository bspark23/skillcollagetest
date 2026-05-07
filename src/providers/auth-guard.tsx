"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { Loading } from "@/components/ui/loading";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (loading) return;

    const normalizedPathname =
      pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;
    const isSigninPage = normalizedPathname === "/admin";
    const isAdminPath =
      normalizedPathname === "/admin" || normalizedPathname.startsWith("/admin/");

    if (!isAuthenticated) {
      // If not authenticated and trying to access any private admin page, go to signin
      if (isAdminPath && !isSigninPage) {
        router.replace("/admin");
      }
      return;
    }

    // Authenticated cases
    if (isAdminPath) {
      // If authenticated but not an admin, redirect away from /admin
      if (user?.role !== "admin") {
        if (normalizedPathname !== "/") {
          router.replace("/");
        }
        return;
      }
      
      // If on signin page but already authenticated as admin, go to overview
      if (isSigninPage) {
        router.replace("/admin/overview");
      }
    }
  }, [isAuthenticated, loading, pathname, router, user?.role]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return <>{children}</>;
}
