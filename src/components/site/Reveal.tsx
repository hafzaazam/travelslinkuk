import type { ElementType, ReactNode, CSSProperties } from "react";
import { useInView } from "@/hooks/use-in-view";

type Direction = "up" | "down" | "left" | "right" | "fade" | "zoom";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
};

const initialTransform: Record<Direction, string> = {
  up: "translate3d(0, 24px, 0)",
  down: "translate3d(0, -24px, 0)",
  left: "translate3d(24px, 0, 0)",
  right: "translate3d(-24px, 0, 0)",
  fade: "translate3d(0, 0, 0)",
  zoom: "scale(0.94)",
};

/**
 * Wraps content with an IntersectionObserver-driven entrance animation.
 * Pure CSS transition under the hood — no runtime animation libs required.
 */
export function Reveal({
  children,
  as: Tag = "div",
  direction = "up",
  delay = 0,
  duration = 700,
  className = "",
  style,
}: RevealProps) {
  const { ref, inView } = useInView();

  const Component = Tag as ElementType;
  return (
    <Component
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : initialTransform[direction],
        transition: `opacity ${duration}ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms`,
        willChange: inView ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Component>
  );
}
