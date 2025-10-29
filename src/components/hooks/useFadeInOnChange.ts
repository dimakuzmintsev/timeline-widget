import { useLayoutEffect } from "react";
import gsap from "gsap";

export function useFadeInOnChange<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  deps: any[],
  dur = 0.25
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0 },
        { opacity: 1, duration: dur, ease: "power2.out" }
      );
    }, ref);
    return () => ctx.revert();
  }, deps);
}
