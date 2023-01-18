import React from "react";

import { useState } from "react";
import ArcProgress from "react-arc-progress";

interface GuageProps {
  value: number;
  max?: number;
  color: string;
}
const Guage = ({ value, color, max = 1023 }: GuageProps) => {
  const getProgress = (input: number) => {
    return Number((input / max).toFixed(5));
  };
  return (
    <div className="">
      <ArcProgress
        progress={getProgress(value)}
        text={String(value)}
        fillColor={color}
        size={130}
        textStyle={{ size: "20px", font: "Rubik" }}
        customText={[
          {
            text: "0       1023",
            x: 65,
            y: 100,
            font: "Rubik",
            size: "12px",
          },
        ]}
      />
    </div>
  );
};

export default Guage;
