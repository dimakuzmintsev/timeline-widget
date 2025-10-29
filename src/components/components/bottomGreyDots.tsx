import React from "react";
import s from "../timeline/Timeline.module.scss";
import { slices } from "../data/timelineData";

type Props = {
  count?: number;
  active: number;
  onSelect: (index: number) => void;
};

export default function BottomGreyDots({
  count = slices.length,
  active,
  onSelect,
}: Props) {
  const dots = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={s.bottomDots}>
      {dots.map((i) => (
        <button
          key={i}
          type="button"
          className={`${s.bottomDot} ${i === active ? s.bottomDotActive : ""}`}
          aria-label={`Показать слайд ${i + 1}`}
          aria-current={i === active}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  );
}
