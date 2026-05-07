"use client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useAppSelector } from "@/store/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { useContent } from "@/hooks/use-content";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const { content } = useAppSelector((state) => state.content);
  useContent();

  const [minTimePassed, setMinTimePassed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMinTimePassed(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const contentReady = !!content?.siteContent?.home;
  const showLoader = !contentReady || !minTimePassed;

  return (
    <AnimatePresence mode="wait">
      {showLoader ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#FFFFFF",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 28,
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.07, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image src="/images/skill-college-logo.png" alt="Skill College" width={160} height={50} style={{ objectFit: "contain" }} />
          </motion.div>
          <div style={{ width: 180, height: 3, background: "rgba(1,36,74,0.1)", borderRadius: 99, overflow: "hidden" }}>
            <motion.div
              style={{ height: "100%", background: "#E58825", borderRadius: 99 }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p style={{ color: "rgba(1,36,74,0.4)", fontSize: 12, letterSpacing: "0.08em" }}>Skill College and Enterprise Ltd</p>
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {children}
          <Sonner />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
