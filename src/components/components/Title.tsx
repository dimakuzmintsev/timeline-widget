import React from "react";

type TitleProps = { title: React.ReactNode };

export default function Title({ title }: TitleProps) {
  return (
    <h1>
      Исторические <br /> даты
    </h1>
  );
}
