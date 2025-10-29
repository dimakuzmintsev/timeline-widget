import React, { useRef, useState, useEffect } from "react";
import s from "../timeline/Timeline.module.scss";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useFadeInOnChange } from "../hooks/useFadeInOnChange";
import "swiper/css";
import { Slice, EventItem } from "../data/timelineData";

type Props = { active: number; slices: Slice[] };

export default function TimelineDataGrid({ active, slices }: Props) {
  const slice: Slice | undefined =
    slices[active] ?? slices.find((s) => s.count === active) ?? slices[0];

  const swiperRef = useRef<SwiperType | null>(null);

  const [atStart, setAtStart] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);
  useFadeInOnChange(gridRef, [active], 1);

  const updateEdges = (sw: any) => {
    console.log(
      "begin/end:",
      sw.isBeginning,
      sw.isEnd,
      "idx:",
      sw.activeIndex,
      "slides:",
      sw.slides.length
    );
    setAtStart(sw.isBeginning);
    setAtEnd(sw.isEnd);
  };

  useEffect(() => {
    const sw = swiperRef.current;
    if (!sw) return;
    sw.update();
    sw.slideTo(0, 0);
    updateEdges(sw);
  }, [active]);

  if (!slice) return null;
  return (
    <>
      <div ref={gridRef} className={s.containerGrid}>
        <button
          className={`${s.arrowCellLeft} ${atStart ? s.gone : ""}`}
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={atStart}
          aria-label="Назад"
        >
          <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
            <path
              d="M7.66418 0.707093L1.41419 6.95709L7.66418 13.2071"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>

        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          speed={400}
          onSwiper={(sw) => {
            swiperRef.current = sw;
            updateEdges(sw);
          }}
          watchOverflow={true}
          onSlideChange={(sw) => updateEdges(sw)}
          onResize={(sw) => updateEdges(sw)}
          loop={false}
          onReachBeginning={(sw) => updateEdges(sw)}
          onReachEnd={(sw) => updateEdges(sw)}
          breakpoints={{
            0: {
              slidesPerView: 1.6,
              spaceBetween: 25,
            },
            480: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className={s.gridSwiper}
        >
          {slice.events.map((event: EventItem, i: number) => (
            <SwiperSlide key={`${slice.title}-${event.year}-${i}`}>
              <time className={s.labelTime} dateTime={String(event.year)}>
                {event.year}
              </time>
              <p>{event.text}</p>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={`${s.arrowCell} ${s.iconRight} ${atEnd ? s.gone : ""}`}
          onClick={() => swiperRef.current?.slideNext()}
          disabled={atEnd}
          aria-label="Вперёд"
        >
          <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
            <path
              d="M7.66418 0.707093L1.41419 6.95709L7.66418 13.2071"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
