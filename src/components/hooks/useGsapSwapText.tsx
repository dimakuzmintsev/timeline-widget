import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type Opts = {
  outDur?: number;
  inDur?: number;
  outEase?: string;
  inEase?: string;
  y?: number;
};

export function useGsapSwapText<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  value: string | number,
  opts: Opts = {}
) {
  const {
    outDur = 0.2,
    inDur = 0.2,
    outEase = "power1.in",
    inEase = "power2.out",
    y = 0,
  } = opts;

  const first = useRef(true);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (first.current) {
      first.current = false;
      el.textContent = String(value);
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.to(el, { opacity: 0, y, duration: outDur, ease: outEase })
        .add(() => {
          el.textContent = String(value);
        })
        .to(el, { opacity: 1, y: 0, duration: inDur, ease: inEase });
    });

    return () => ctx.revert();
  }, [ref, value, outDur, inDur, outEase, inEase, y]);
}
