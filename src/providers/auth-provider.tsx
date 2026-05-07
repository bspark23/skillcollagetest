"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchCurrentUser } from "@/store/slices/auth-slice";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return <>{children}</>;
}
