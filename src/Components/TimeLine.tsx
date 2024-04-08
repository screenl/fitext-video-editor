"use client";

import React from "react";
import Boxes from "./TimeLineGadgets/ResizableBoxes";
import { Rows } from "./TimeLineGadgets/rows";
import { BoxesProps } from "./TimeLineGadgets/ResizableBoxes";

const TimeLine: React.FC<any> = ([exercises,setExercises], [width, setWidth]) => {
  return (
    <div>
      <div className="flex justify-center bg-white text-black">
        <div className="flex w-full">
          <Rows />
          <div className="flex-1 overflow-x-scroll hover:overflow-x-auto focus:overflow-x-auto">
            {Boxes([exercises,setExercises],[width,setWidth])}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeLine;