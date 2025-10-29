import React, { useMemo, useRef, useState } from "react";
import s from "./Timeline.module.scss";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { slices } from "../data/timelineData";
import Title from "../components/Title";
import TimelineCenter from "../components/TimelineCenter";
import CircleWrap from "../components/CircleWrap";
import SlideButtons from "../components/SlideButtons";
import TimelineDataGrid from "../components/TimelineDataGrid";

export default function Timeline() {
  const [active, setActive] = useState(0);
  const [shift, setShift] = useState(0);
  const swiperRef = useRef<any>(null);

  const N = slices.length;

  const angle = 360 / N;
  const shortest = (from: number, to: number) =>
    ((to - from + 540) % 360) - 180;

  const handleClick = (i: number) => {
    const newShift = -i * angle;
    const diff = ((newShift - shift + 540) % 360) - 180;
    setShift((prev) => prev + diff);
    swiperRef.current?.slideTo(i);
  };

  const rotateFunc = (dir: "next" | "prev") => {
    const delta = dir === "next" ? 1 : -1;
    const newIndex = (active + delta + N) % N;
    setShift((prev) => prev - delta * angle);

    setActive(newIndex);
    swiperRef.current?.slideTo(newIndex);
  };

  const handleClickPrev = (i: number) => {
    const newShift = -i * angle;
    const diff = ((newShift - shift + 540) % 360) - 180;
    setShift((prev) => prev + diff);
    swiperRef.current?.slideTo(i);
  };

  console.log(slices);

  return (
    <section className={s.container}>
      <Title title="Исторические даты" />
      <TimelineCenter
        firstTime={slices[active].from}
        secondTime={slices[active].to}
      />
      <div className={s.line}></div>
      <CircleWrap
        active={active}
        swiperRef={swiperRef}
        handleClick={handleClick}
        N={N}
        shift={shift}
      />

      <Swiper
        onSwiper={(sw) => (swiperRef.current = sw)}
        onSlideChange={(sw) => setActive(sw.activeIndex)}
        slidesPerView={1}
      ></Swiper>

      <div className={s.slidercontainer}>
        <SlideButtons
          active={active}
          total={N}
          onRotate={rotateFunc}
          onSelect={handleClick}
        />

        <TimelineDataGrid active={active} slices={slices} />
      </div>
    </section>
  );
}
