"use client";

import React from "react";
import Boxes from "./TimeLineGadgets/ResizableBoxes";
import { Rows } from "./TimeLineGadgets/rows";
// import { BoxesProps } from "./TimeLineGadgets/ResizableBoxes";

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
      { name: string; reps: number; sets: number; time: number; size: number }[]
    >
  >;
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  current: number;
  vs: any; //The state of the video from page.tsx, check the comments
}

const TimeLine: React.FC<TimeLineProps> = ({
  exercises,
  setExercisesState,
  width,
  setWidth,
  current,
  vs,
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
              current={current}
              vs={vs}
            />
          </div>
          {/*<div className="flex-1 overflow-x-auto hover:overflow-x-auto focus:overflow-x-auto">*/}
          {/*    <Boxes exercises={exercises} setExercisesState={setExercisesState}/>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
