import React, { useEffect, useState } from "react";
import { ResizablePanel } from "../ui/resizable";
import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/Components/ui/popover";

interface ResizableBoxProps {
  defaultSize: number;
  className: string;
  reps: number;
  sets: number;
  time: number;
  onRepsChange: (value: number) => void;
  onSetsChange: (value: number) => void;
  onTimeChange: (value: number) => void;
  onExerciseChange: (value: string) => void;
  setSize: (size: number) => void;
  width: number;
  setWidth: (value: number) => void;
}

interface GridProps {
  onClick: (gif: Gif, exerciseName: string, reps: number, sets: number) => void;
}

interface Gif {
  default: {
    src: string;
  };
}

const importAll = (r: __WebpackModuleApi.RequireContext) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call
  return r.keys().map(r);
};
// @ts-expect-error - TS is having a hard time to realize this is a string[].
// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
const gifFiles: Gif[] = importAll(
  require.context("public/assets/exercises", false, /\.(gif)$/),
);

const staticExercises: string[] = [
  "butterfly stretch",
  "calf stretch",
  "chest stretch",
  "child pose",
  "hamstring stretch",
  "hip stretch",
  "plank",
  "quad stretch",
  "sit and reach stretch",
  "sit v leg stretch center",
  "sit v leg stretch LR",
  "spine lumbar twist stretch",
  "Split sink LR",
  "split stretch",
  "wall sit",
];

const Grid: React.FC<GridProps> = ({ onClick }) => {
  const [gifStates, setGifStates] = useState<Gif[]>(gifFiles);

  return (
    <div className="grid max-h-[300px] max-w-[400px] grid-cols-3 gap-4 overflow-auto">
      {gifStates.map((gif: Gif) => (
        <Image
          src={gif.default.src}
          width={200}
          height={100}
          key={gif.default.src}
          onClick={() => {
            // @ts-expect-error - requires a lots of checks for undefined values.
            const exerciseName = gif.default.src
              .split("/")
              .pop()
              .split(".")
              .shift()
              .split("_")
              .join(" ");

            onClick(gif, exerciseName, 1, 1);
          }}
          alt={gif.default.src}
        />
      ))}
    </div>
  );
};

const ResizableBox: React.FC<ResizableBoxProps> = ({
  defaultSize,
  className,
  reps,
  sets,
  time,
  onRepsChange,
  onSetsChange,
  onTimeChange,
  onExerciseChange,
  setSize,
  width,
  setWidth,
}) => {
  const [exercise, setExercise] = useState<React.ReactNode | null>(null);
  const [exerciseName, setExerciseName] = useState<string>(""); // Add this line

  const handleRepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRepsChange(Number(event.target.value));
  };

  const handleSetsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSetsChange(Number(event.target.value));
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTimeChange(Number(event.target.value));
  };

  return (
    <ResizablePanel
      defaultSize={defaultSize}
      className={className}
      onResize={(size, prev_size = defaultSize) => {
        console.log("size:", size, "Prev", prev_size);
        if ((size / 100) * width <= 100) {
          setWidth(10000 / size);
        }
        // setSize(size);
        //setSize(size*prev_size/100);
      }}
    >
      <div className="flex items-center justify-center text-center">
        <Popover>
          <PopoverTrigger asChild>
            {exercise ? (
              exercise
            ) : (
              <button className="btn btn-circle btn-outline btn-info text-2xl">
                +
              </button>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-[400px]">
            <Grid
              onClick={(
                gif: Gif,
                exerciseName: string,
                reps: number,
                sets: number,
              ) => {
                onExerciseChange(exerciseName);

                setExerciseName(exerciseName);
                onRepsChange(reps);
                onSetsChange(sets);

                setExercise(
                  <div>
                    <p>{exerciseName}</p>
                    <Image
                      src={gif.default.src}
                      className={"max-h-20"}
                      width={150}
                      height={100}
                      alt={gif.default.src}
                    />
                  </div>,
                );
                // console.log(exercise);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center justify-center text-center">
        <input
          type="number"
          className="remove-arrow input h-5 w-10 border-gray-300 bg-gray-200 text-gray-800"
          value={reps}
          onChange={handleRepsChange}
          disabled={staticExercises.includes(exerciseName)}
        />
      </div>
      <div className="flex items-center justify-center text-center">
        <input
          type="number"
          className="remove-arrow input h-5 w-10 border-gray-300 bg-gray-200 text-gray-800"
          value={sets}
          onChange={handleSetsChange}
          disabled={staticExercises.includes(exerciseName)}
        />
      </div>
      <div className="flex items-center justify-center text-center">
        <input
          type="number"
          className="remove-arrow input h-5 w-10 border-gray-300 bg-gray-200 text-gray-800"
          value={time}
          onChange={handleTimeChange}
        />
      </div>
    </ResizablePanel>
  );
};

export default ResizableBox;
