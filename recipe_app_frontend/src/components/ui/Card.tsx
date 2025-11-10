import React, { ComponentPropsWithoutRef } from "react";

type Intrinsic = keyof HTMLElementTagNameMap;

type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: Intrinsic;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
} & Partial<ComponentPropsWithoutRef<any>>;

/**
 * PUBLIC_INTERFACE
 * Card container with hover elevation and rounded corners.
 */
export function Card({ children, className = "", as = "div", ...rest }: CardProps) {
  const Comp: any = as;
  return (
    <Comp className={`card ${className}`} {...rest}>
      {children}
    </Comp>
  );
}
