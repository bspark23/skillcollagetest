"use client";

import type { CSSProperties, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  stagger?: boolean;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export function AnimatedSection({
  children,
  className,
  style,
  as: Tag = "div",
}: AnimatedSectionProps) {
  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
}
