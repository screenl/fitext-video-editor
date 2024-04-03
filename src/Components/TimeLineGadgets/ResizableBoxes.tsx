import React, {useState} from 'react';
import { ResizableHandle, ResizablePanelGroup } from "../ui/resizable";
import ResizableBox from './ResizableBox';

interface BoxesProps {
    exercises: Array<{reps: number, sets: number, time: number}>;
    setExercisesState: React.Dispatch<React.SetStateAction<{reps: number, sets: number, time: number}[]>>;
}

const Boxes: React.FC<BoxesProps> = ({exercises, setExercisesState}) => {
    const handleExerciseChange = (index: number, field: string, value: number) => {
        const newExercisesState = [...exercises];
        exercises[index][field] = value;
        setExercisesState(newExercisesState);
    };

    return (
      // <div className="h-full w-[1000px]">
      <div className="h-full w-100">
        <ResizablePanelGroup
            direction="horizontal"
            className="flex-col rounded-lg border"
        >
          {exercises.map((exercise, index) => (
              <>
                  { index > 0 && index < exercises.length && <ResizableHandle withHandle/>}
                  <ResizableBox key={index} defaultSize={30}
                    className="grid grid-rows-4 justify-items-stretch divide-y"
                    reps={exercise.reps} sets={exercise.sets}
                    time={exercise.time}
                    onRepsChange={(value: number) => handleExerciseChange(index, 'reps', value)}
                    onSetsChange={(value: number) => handleExerciseChange(index, 'sets', value)}
                    onTimeChange={(value: number) => handleExerciseChange(index, 'time', value)}
                  >
                    {/*<Exercise />*/}
                  </ResizableBox>
              </>
          ))}
        </ResizablePanelGroup>
      </div>
  );
}

export default Boxes;