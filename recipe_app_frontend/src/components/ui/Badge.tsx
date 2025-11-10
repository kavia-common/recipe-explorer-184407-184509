import React from "react";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * PUBLIC_INTERFACE
 * Badge for small metadata like difficulty or cuisine.
 */
export function Badge({ children, className = "" }: BadgeProps) {
  return <span className={`badge ${className}`}>{children}</span>;
}
