import { cn } from "@/lib/utils";
import React, { JSX } from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  tag?: keyof JSX.IntrinsicElements;
  ellipsis?: boolean;
  muted?: boolean;
  large?: boolean;
  small?: boolean;
  children: React.ReactNode;
}

export function Typography({ tag, children, ...props }: TypographyProps) {
  const styles = cn(
    props.ellipsis && "w-full truncate",
    props.muted && "text-muted-foreground",
    props.large && "text-lg ",
    props.small && "text-sm",
    props.className,
  );

  const allowedTags = ["h1", "h2", "h3", "h4", "p", "span", "div", "label", "blockquote"];
  const Tag = (tag && allowedTags.includes(tag)) ? tag : "p";

  return <Tag className={styles}>{children}</Tag>;
}
