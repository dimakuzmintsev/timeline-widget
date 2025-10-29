import React, { useEffect, useMemo, useRef, useState } from "react";
import { slices } from "../data/timelineData";
import s from "../timeline/Timeline.module.scss";
import type { Swiper as SwiperType } from "swiper";
import gsap from "gsap";

interface circleProps {
  active: number;
  swiperRef: React.MutableRefObject<SwiperType | null>;
  handleClick: (i: number) => void;
  N: number;
  shift: number;
}

export default function CircleWrap({
  active,
  swiperRef,
  handleClick,
  N,
  shift,
}: circleProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const previewIndex = active;
  const dotIndices = useMemo(() => Array.from({ length: N }, (_, i) => i), [N]);
  const homeindex = active;

  const slice =
    slices[active] ?? slices.find((s) => s.count === active) ?? slices[0];

  const labelRef = useRef<HTMLDivElement | null>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!labelRef.current) return;
    tlRef.current?.kill();

    const el = labelRef.current;
    const tl = gsap.timeline();
    tl.to(el, { opacity: 0, y: 0, duration: 0.0 })
      .add(() => {
        el.textContent = slices[active].title;
      })
      .to(el, { opacity: 1, y: 0, duration: 1 });

    tlRef.current = tl;
    return () => {
      tlRef.current?.kill();
    };
  }, [active]);

  return (
    <div className={s.circleContainer}>
      <div className={s.circleLayer}>
        <div className={s.circle} />
      </div>
      <div
        className={s.circleWrap}
        style={{
          ["--shift" as any]: `${shift}deg`,
          ["--n" as any]: N,
        }}
      >
        <div className={s.dotsLayer}>
          {dotIndices.map((i) => (
            <button
              key={i}
              className={s.dot}
              style={{ ["--i" as any]: i }}
              onClick={() => handleClick(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`Go to slide ${i + 1}`}
            >
              {hovered === i && <span className={s.dotIndex}>{i + 1}</span>}
            </button>
          ))}
          <div></div>
        </div>
        <div className={s.markerLayer}>
          <div className={s.bigDot} style={{ ["--i" as any]: 0 }}>
            <div className={s.bigDotInner}>
              <div className={s.bigDotCount}>{active + 1}</div>
            </div>
          </div>
        </div>
        <div ref={labelRef} className={s.bigDotLabel}>
          {slices[active].title}
        </div>
      </div>
    </div>
  );
}
