import React, {useState} from 'react';
import { ResizableHandle, ResizablePanelGroup } from "../ui/resizable";
import ResizableBox from './ResizableBox';

interface BoxesProps {
    exercises: Array<{
        reps: number;
        sets: number;
        time: number;
        size: number;
    }>;
    setExercisesState: React.Dispatch<React.SetStateAction<{reps: number, sets: number, time: number}[]>>;
}

const Boxes: React.FC<BoxesProps> = ({exercises, setExercisesState}, [width, setWidth]) => {
    const handleExerciseChange = (index: number, field: string, value: number|string) => {
        const newExercisesState = [...exercises];
        exercises[index][field] = value;
        setExercisesState(newExercisesState);
    };

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
      {/*// <div className="h-full w-[1000px]">*/}
      {/*// <div className="h-full w-100">*/}
        <ResizablePanelGroup
            direction="horizontal"
            className="flex-col rounded-lg border"
        >
          {exercises.map((exercise, index) => (
              <>
                  { index > 0 && index < exercises.length && <ResizableHandle withHandle/>}
                  <ResizableBox key={index} defaultSize={100}
                    className="grid grid-rows-4 justify-items-stretch divide-y"
                    reps={exercise.reps} sets={exercise.sets}
                    time={exercise.time}
                    onRepsChange={(value: number) => handleExerciseChange(index, 'reps', value)}
                    onSetsChange={(value: number) => handleExerciseChange(index, 'sets', value)}
                    onTimeChange={(value: number) => handleExerciseChange(index, 'time', value)}
                    onExerciseChange={(value: string) => handleExerciseChange(index, 'name', value)}
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