import React, { useState } from "react";
import { ResizableHandle, ResizablePanelGroup } from "../ui/resizable";
import ResizableBox from "./ResizableBox"; // import the new component
// import Exercise from './Exercise'; // import the Exercise component

interface BoxesProps {
  exercises: Array<{ reps: number; sets: number; time: number }>;
}

const Boxes: React.FC<BoxesProps> = ({ exercises }) => {
  const [width, setWidth] = useState(200);
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

    console.log("New", newScrollLeft);

    console.log("ScrollLeft:", container.scrollLeft);
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
        <ResizableBox
          defaultSize={30}
          className="grid grid-rows-4 justify-items-stretch divide-y"
          reps={30}
          sets={3}
          time={30}
        >
          {/*<Exercise />*/}
        </ResizableBox>

        <ResizableHandle withHandle pinid={1} color="green"/>

        <ResizableBox
          defaultSize={30}
          className="grid grid-rows-4 justify-items-stretch divide-y"
          reps={30}
          sets={3}
          time={30}
        >
          {/*<Exercise />*/}
        </ResizableBox>

        <ResizableHandle withHandle pinid={1} color="green"/>

        <ResizableBox
          defaultSize={30}
          className="grid grid-rows-4 justify-items-stretch divide-y"
          reps={30}
          sets={3}
          time={30}
        >
          {/*<Exercise />*/}
        </ResizableBox>

        {/*  TODO: Refactor this one: */}
        {/*  render resizable box for each exercise in array */}
        {exercises.map((exercise, index) => (
          <>
            <ResizableHandle withHandle />
            <ResizableBox
              key={index}
              defaultSize={30}
              className="grid grid-rows-4 justify-items-stretch divide-y"
              reps={exercise.reps}
              sets={exercise.sets}
              time={exercise.time}
            >
              {/*<Exercise />*/}
            </ResizableBox>
          </>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default Boxes;
