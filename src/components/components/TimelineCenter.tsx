import { useCountUp } from "../hooks/useCountUp";
import s from "../timeline/Timeline.module.scss";

interface timeProps {
  firstTime: number;
  secondTime: number;
}

export default function TimelineCenter({ firstTime, secondTime }: timeProps) {
  const left = useCountUp(firstTime, 0.5);
  const right = useCountUp(secondTime, 0.5);

  return (
    <div className={s.timelinecenter}>
      <time className={s.leftyear} dateTime={String(left)}>
        {left}
      </time>
      <time className={s.rightyear} dateTime={String(right)}>
        {right}
      </time>
    </div>
  );
}
