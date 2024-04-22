"use client"; // This is a client component 👈🏽

import player from "../Components/video_player";
import { useState } from "react";

import TimeLine from "~/Components/TimeLine";
import VideoUploadButton from "~/Components/VideoUploadButton";
import AddExcersiseButton from "~/Components/AddExcersiseButton";

export default function HomePage() {
  const [vs, setvs] = useState({
    time: 1,
    progress: 0,
    workout_desc: "",
    playing: false,
  });
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const [exercises, setExercises] = useState<Array<{reps: number, sets: number, time: number, size: number}>>([{ reps: 0, sets: 0, time: 0, size: 30}]);
  const addExercise = () => {
    //
    if(exercises.length == 0) {
      setExercises([...exercises, { reps: 0, sets: 0, time: 0, size: 100}]);
      return;
    }
    exercises[exercises.length-1]!.size /= 2;
    setExercises([...exercises, { reps: 0, sets: 0, time: 0, size: exercises[exercises.length-1]!.size}]);
  };

  const [width, setWidth] = useState(200);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="flex">
          <div className="aspect-video h-[450px] w-[975px]">
            {player(vs, setvs, videoUrl)}
          </div>
          {/* 添加竖屏组件,与横屏视频对齐 */}
          <div className="ml-2 h-[450px] w-[250px] bg-white p-4 rounded-lg">
            {/* 竖屏上半部分留出空白放视频 */}
            <div className="bg-gray-200 h-[200px] rounded-lg mb-4"></div>
            {/* 大的bubble */}
            <div className="bg-blue-500 text-white p-2 rounded-lg mb-4">
              {/* 两个平行的小bubble */}
              <div className="flex justify-between mb-2">
                <span className="bg-white text-blue-500 px-2 py-1 rounded-full text-sm">Set 2/2</span>
                <span className="bg-white text-blue-500 px-2 py-1 rounded-full text-sm">28 Sec</span>
              </div>
              {/* 两个进度条 */}
              <div className="h-1 bg-white rounded-full mb-1"></div>
              <div className="h-1 bg-white rounded-full"></div>
            </div>
            {/* 三个从上到下的小bubble */}
            <div className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg mb-2">Rest</div>
            <div className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg mb-2">Flex Sits</div>
            <div className="bg-gray-200 text-gray-800 px-2 py-1 rounded-lg mb-4">Leg Curls</div>
            {/* 竖屏最下面的长条 */}
            <div className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
              <i className="fas fa-map-marker-alt text-gray-500"></i>
              <i className="fas fa-chevron-left text-gray-500"></i>
              <i className="fas fa-pause text-gray-500"></i>
              <i className="fas fa-chevron-right text-gray-500"></i>
            </div>
          </div>
        </div>
        <div className="flex flex-row ">
          <div className="w-[850px]">
            {TimeLine([exercises, setExercises], [width, setWidth])}
          </div>

          {/* The div for the buttons on the right */}
          <div className="flex flex-col overflow-hidden bg-white">
            <AddExcersiseButton addExercise={addExercise} />
            <VideoUploadButton onVideoUpload={setVideoUrl} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>
      </div>
    </main>
  );
}
