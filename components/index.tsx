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
        size={90}
        textStyle={{ size: "15px", font: "Rubik" }}
        customText={[
          {
            text: "0     1023",
            x: 45,
            y: 79,
            font: "Rubik",
            size: "5px",
          },
        ]}
      />
    </div>
  );
};

export default Guage;
