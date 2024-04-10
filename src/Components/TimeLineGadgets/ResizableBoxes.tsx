import React, { useState } from "react";
import { ResizableHandle, ResizablePanelGroup } from "../ui/resizable";
import ResizableBox from "./ResizableBox"; // import the new component
// import Exercise from './Exercise'; // import the Exercise component

export interface BoxesProps {
  exercises: Array<{ 
    reps: number; 
    sets: number; 
    time: number;
    size: number;
  }>;
}



const Boxes: React.FC<any> = ([exercises,setExercises], [width, setWidth]) => {
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const containerRect = container.getBoundingClientRect();
    const cursorXRelativeToContainer = event.clientX - containerRect.left;
    const cursorRatio = cursorXRelativeToContainer / containerRect.width;

    const delta = event.deltaY;
    const newWidth = width + delta;

    // Calculate the new width and ensure minimum width
    let adjustedWidth;
    if (newWidth < 100) {
      adjustedWidth = 100;
    } else {
      adjustedWidth = newWidth;
    }

    // Calculate the new scrollLeft position to keep the cursor centered
    const newScrollLeft =
      container.scrollLeft + (adjustedWidth - width) * cursorRatio;

    // Update width and scrollLeft
    setWidth(adjustedWidth);
    container.scrollLeft = newScrollLeft;
    console.log(exercises);
  };

  function sizeSetter(index: number){
    return ((s: number)=>{
      console.log(index,exercises,s);
      exercises[index].size = s;
    });
  };

  return (
    <div
      className="h-full min-w-[800px]"
      style={{ width: `${width}px` }}
      onWheel={handleWheel}
    >
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-col rounded-lg border"
      >



        {/*  TODO: Refactor this one: */}
        {/*  render resizable box for each exercise in array */}
        {exercises.map((exercise: { reps: any; sets: any; time: any; size: number }, index: number) => (
          <>
            <ResizableBox
              key = {index+1}
              defaultSize={exercise.size}
              className="grid grid-rows-4 justify-items-stretch divide-y"
              reps={exercise.reps}
              sets={exercise.sets}
              time={exercise.time}
              setSize={sizeSetter(index)}
            >
              {/*<Exercise />*/}
            </ResizableBox>

            <ResizableHandle />
          </>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default Boxes;
