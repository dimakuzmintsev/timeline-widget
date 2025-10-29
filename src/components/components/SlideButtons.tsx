import React, { useRef } from "react";
import s from "../timeline/Timeline.module.scss";
import BottomGreyDots from "./bottomGreyDots";

interface SlideButtonsProps {
  active: number;
  total?: number;
  onRotate: (dir: "prev" | "next") => void;
  onSelect?: (index: number) => void;
}

export default function SlideButtons({
  active,
  total = 6,
  onRotate,
  onSelect,
}: SlideButtonsProps) {
  const labelRef = useRef<HTMLLabelElement>(null);

  return (
    <div className={s.slidebuttons}>
      <label ref={labelRef} className={s.slideCounter}>
        {String(active + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
      </label>

      <div className={s.buttonsslider}>
        <button onClick={() => onRotate("prev")} className={s.buttonlider}>
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.66418 0.707093L1.41419 6.95709L7.66418 13.2071"
              stroke="#42567A"
              strokeWidth="2"
            />
          </svg>
        </button>

        <button
          onClick={() => onRotate("next")}
          className={`${s.buttonlider} ${s.iconRight}`}
        >
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.66418 0.707093L1.41419 6.95709L7.66418 13.2071"
              stroke="#42567A"
              strokeWidth="2"
            />
          </svg>
        </button>

        {onSelect && (
          <BottomGreyDots count={total} active={active} onSelect={onSelect} />
        )}
      </div>
    </div>
  );
}
