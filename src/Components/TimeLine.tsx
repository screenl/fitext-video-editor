"use client";

import React from "react";
import Boxes from "./TimeLineGadgets/ResizableBoxes";
import { Rows } from "./TimeLineGadgets/rows";

interface TimeLineProps {
  exercises: Array<{
    name: string;
    reps: number;
    sets: number;
    time: number;
    size: number;
  }>;
  setExercisesState: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        reps: number;
        sets: number;
        time: number;
        size: number;
      }[]
    >
  >;
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  setTimeLineScrollPosition: React.Dispatch<React.SetStateAction<number>>;
  timelineVisibleWidth: number;
  timelineTotalWidth: number;
}

const TimeLine: React.FC<TimeLineProps> = ({
  exercises,
  setExercisesState,
  width,
  setWidth,
}) => {
  return (
    <div>
      <div className="flex justify-center bg-white text-black">
        <div className="flex w-full">
          <Rows />
          <div className="flex-1 overflow-x-scroll">
            <Boxes
              exercises={exercises}
              setExercisesState={setExercisesState}
              width={width}
              setWidth={setWidth}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
