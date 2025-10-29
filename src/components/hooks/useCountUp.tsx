// useCountUp.ts
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

export function useCountUp(
  target: number,
  duration = 0.6,
  ease = "power2.out"
) {
  const [display, setDisplay] = useState(target);
  const objRef = useRef({ val: target });
  const firstRun = useRef(true);

  useLayoutEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      objRef.current.val = target;
      setDisplay(target);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(objRef.current, {
        val: target,
        duration,
        ease,
        onUpdate: () => setDisplay(Math.round(objRef.current.val)),
      });
    });

    return () => ctx.revert();
  }, [target, duration, ease]);

  return display;
}
