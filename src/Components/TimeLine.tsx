"use client";

import React from "react";
import Boxes from "./TimeLineGadgets/ResizableBoxes";
import { Rows } from "./TimeLineGadgets/rows";
import { BoxesProps } from "./TimeLineGadgets/ResizableBoxes";

interface TimeLineProps {
    exercises: Array<{reps: number, sets: number, time: number}>;
    setExercisesState: React.Dispatch<React.SetStateAction<{reps: number, sets: number, time: number}[]>>;
}

const TimeLine: React.FC<TimeLineProps> = ({exercises, setExercisesState}) => {
  return (
    <div>
      <div className="flex justify-center bg-white text-black">
        <div className="flex w-full">
          <Rows />
        {/*<div className="flex-1 overflow-x-scroll hover:overflow-x-auto focus:overflow-x-auto">*/}
        {/*    {Boxes([exercises,setExercises],[width,setWidth])}*/}
        {/*</div>*/}
          <div className="flex-1 overflow-x-auto hover:overflow-x-auto focus:overflow-x-auto">
            <Boxes exercises={exercises} setExercisesState={setExercisesState} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeLine;