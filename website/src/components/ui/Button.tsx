import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center rounded-md px-6 py-3 font-mono text-sm uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-text-primary hover:bg-primary-muted active:translate-y-px shadow-sm",
  secondary:
    "border border-accent text-accent hover:bg-accent hover:text-bg-base active:translate-y-px",
  ghost: "text-text-primary hover:text-accent",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type AnchorProps = CommonProps & {
  href: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

type NativeButtonProps = CommonProps & {
  href?: undefined;
} & Omit<ComponentProps<"button">, "className" | "children">;

type ButtonProps = AnchorProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children } = props;
  const classes = cn(base, variants[variant], className);

  if (props.href !== undefined) {
    const { href, variant: _v, className: _c, children: _ch, ...rest } = props;
    void _v;
    void _c;
    void _ch;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, ...rest } = props;
  void _v;
  void _c;
  void _ch;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
