"use client"; // This is a client component 👈🏽

import player from "../Components/video_player";
import React, { useState } from "react";

import TimeLine from "~/Components/TimeLine";
import VideoUploadButton from "~/Components/VideoUploadButton";
import AddExerciseButton from "~/Components/AddExerciseButton";
import PortraitView from "~/Components/PortraitView";

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

    // exercises[exercises.length - 1]!.size /= 2;
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

  const [timelineScrollPosition, setTimelineScrollPosition] = useState(0);
  const [timelineVisibleWidth, setTimelineVisibleWidth] = useState(0);
  const [timelineTotalWidth, setTimelineTotalWidth] = useState(0);

  // UseEffects to calculate the timelineScrollPosition, timelineVisibleWidth, and timelineTotalWidth

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center px-4">
        <div className="flex flex-row">
          <div className="aspect-video h-[450px] w-[975px]">
            {player(
              vs,
              setvs,
              timelineScrollPosition,
              timelineVisibleWidth,
              timelineTotalWidth,
              videoUrl,
            )}
          </div>
          <PortraitView
            currentExercise={exercises[0] ?? null}
            vs={vs}
            setvs={setvs}
            videoUrl={videoUrl}
          />
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

          {/*  TODO: max-height */}
          <div className="flex flex-col overflow-hidden bg-white">
            <AddExerciseButton addExercise={addExercise} />
            <VideoUploadButton onVideoUpload={setVideoUrl} />
          </div>
        </div>
      </div>
    </main>
  );
}
