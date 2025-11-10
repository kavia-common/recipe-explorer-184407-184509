import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

/**
 * PUBLIC_INTERFACE
 * Button with Ocean Professional styling and accessible focus states.
 */
export function Button({ variant = "primary", iconLeft, iconRight, children, className = "", ...rest }: ButtonProps) {
  const variantClass =
    variant === "primary" ? "btn-primary" :
    variant === "secondary" ? "btn-secondary" :
    "btn-ghost";
  return (
    <button className={`btn ${variantClass} ${className}`} {...rest}>
      {iconLeft ? <span aria-hidden>{iconLeft}</span> : null}
      <span>{children}</span>
      {iconRight ? <span aria-hidden>{iconRight}</span> : null}
    </button>
  );
}
