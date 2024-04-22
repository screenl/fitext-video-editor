"use client"; // This is a client component 👈🏽

import player from "../Components/video_player";
import React, { useState } from "react";

import TimeLine from "~/Components/TimeLine";
import VideoUploadButton from "~/Components/VideoUploadButton";
import AddExerciseButton from "~/Components/AddExerciseButton";
import PortraitView from "~/Components/PortraitView";

interface MobilePreviewProps {
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

const MobilePreview: React.FC<MobilePreviewProps> = ({
  videoUrl,
  setvs,
  vs,
}) => {
  return (
    <div className="aspect-video h-[450px] w-[300px]">
      {player(vs, setvs, videoUrl)}
    </div>
  );
};

export default function HomePage() {
  const [vs, setvs] = useState({
    time: 1,
    progress: 0,
    workout_desc: "",
    playing: false,
  });
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const [exercises, setExercisesState] = useState<
    Array<{
      name: string;
      reps: number;
      sets: number;
      time: number;
      size: number;
    }>
  >([]);

  const addExercise = () => {
    if (exercises.length == 0) {
      setExercisesState([
        ...exercises,
        { name: "jogging", reps: 0, sets: 0, time: 0, size: 100 },
      ]);
      return;
    }

    exercises[exercises.length - 1]!.size /= 2;
    setExercisesState([
      ...exercises,
      {
        name: "jogging",
        reps: 0,
        sets: 0,
        time: 0,
        size: exercises[exercises.length - 1]!.size,
      },
    ]);
  };

  const [width, setWidth] = useState(200);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center px-4">
        {/* Top part with Landscape and Portrait view */}
        <div className="flex flex-row">
          <div className="aspect-video h-[450px] w-[900px]">
            {player(vs, setvs, videoUrl)}
          </div>
          {/*  TODO: fix size issues */}
          {/*<MobilePreview vs={vs} setvs={setvs} videoUrl={videoUrl} />*/}
          {/*<div className="aspect-video h-[450px] w-[975px]">*/}
          {/*  {player(vs, setvs, videoUrl)}*/}
          {/*</div>*/}

          <PortraitView />
        </div>

        <div className="flex flex-row ">
          <div className="w-[850px]">
            <TimeLine
              exercises={exercises}
              setExercisesState={setExercisesState}
              width={width}
              setWidth={setWidth}
            />
          </div>

          {/* The div for the buttons on the right */}
          <div className="flex flex-col overflow-hidden bg-white">
            <AddExerciseButton addExercise={addExercise} />
            <VideoUploadButton onVideoUpload={setVideoUrl} />
          </div>
        </div>
      </div>
    </main>
  );
}
