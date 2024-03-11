"use client"; // This is a client component 👈🏽

import Link from "next/link";
import player from "../Components/video_player";
import { videoState } from "~/Components/video_state";
import { useState, useEffect } from "react";

import TimeLine from "~/Components/TimeLine";

export default function HomePage() {
  const [vs, setvs] = useState({
    time: 17,
    progress: 0,
    workout_desc: "Legs Curls glutes",
    playing: false,
  });
  /* 
  testing

  useEffect(()=>{
    const interval = setInterval(()=>{
      setvs({...vs,progress:(vs.progress+1)%vs.time} as videoState);
    },1)
    return () => clearInterval(interval);
  },[vs]); */

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="aspect-video h-[450px] w-[975px]">
          {player(vs, setvs)}
        </div>
        <div className="h-[250 px] flex flex-row ">
          <div className="w-[850px]">{TimeLine()}</div>

          {/* The div for the buttons on the right */}
          <div className=" flex flex-col overflow-hidden bg-white">
            <button className="w-50 btn btn-info m-5">Add Exercise +</button>
            {/* For Jack and Pavel: Feel free to change the below button */}
            <button className="w-50 btn btn-warning m-5">Add Video</button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8"></div>
      </div>
    </main>
  );
}
