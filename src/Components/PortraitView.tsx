import React from "react";
import MobileVideoPlayer from "~/Components/mobile_video_player";
import BottomBar from "~/Components/BottomBar";

interface Exercise {
  name: string;
  reps: number;
  sets: number;
  time: number;
  size: number;
}

interface PortraitViewProps {
  currentExercise: Exercise | null;
  videoUrl: string | null;
  setvs: (
    value:
      | ((prevState: {
          workout_desc: string;
          progress: number;
          playing: boolean;
          time: number;
        }) => {
          workout_desc: string;
          progress: number;
          playing: boolean;
          time: number;
        })
      | {
          workout_desc: string;
          progress: number;
          playing: boolean;
          time: number;
        },
  ) => void;
  vs: {
    workout_desc: string;
    progress: number;
    playing: boolean;
    time: number;
  };
}

const PortraitView: React.FC<PortraitViewProps> = ({
  currentExercise,
  videoUrl,
  setvs,
  vs,
}) => {
  return (
    <div className="ml-1 h-[450px] w-[250px] rounded-lg bg-white p-1">
      <div className="h-[200px] bg-gray-200">
        {MobileVideoPlayer(vs, setvs, videoUrl)}
        {/* TODO: Gif  or smth, would need to make gifs into page.tsx and etc. Future me knows */}
      </div>

      <div className="mb-2 rounded-lg bg-blue-500 p-2 text-white">
        <div className="mb-1 text-center text-base font-bold">
          {currentExercise?.name}
        </div>
        <div className="mb-2 flex justify-between">
          <span className="rounded-full bg-white px-2 py-1 text-sm text-blue-500">
            Reps: {currentExercise?.reps}
          </span>
          <span className="rounded-full bg-white px-2 py-1 text-sm text-blue-500">
            {/*  TODO: define current set based on the video duration */}
            Sets:{" "}
            {currentExercise &&
              Math.floor(
                (vs.progress - 1) /
                  (currentExercise.time / currentExercise.sets),
              ) + 1}{" "}
            / {currentExercise?.sets}
          </span>
          <span className="rounded-full bg-white px-2 py-1 text-sm text-blue-500">
            Time:
            {currentExercise &&
              Math.round(currentExercise?.time - vs.progress)}{" "}
            Sec
          </span>
        </div>
        <div className="mb-1 h-1 rounded-full bg-white"></div>
        <div className="h-1 rounded-full bg-white"></div>
      </div>
      {/*  TODO: next exercises */}
      <div className="mb-2 rounded-lg bg-gray-200 px-2 py-1 text-gray-800">
        Rest
      </div>

      <BottomBar onPauseClick={() => setvs({ ...vs, playing: !vs.playing })} />
    </div>
  );
};

export default PortraitView;
