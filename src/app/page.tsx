"use client"; // This is a client component 👈🏽

import Link from "next/link";
import player from "../Components/video_player";
import {videoState} from "../Components/video_player";
import { useState,useEffect } from "react";


export default function HomePage() {

  const [vs,setvs] = useState({time:1000,progress:400,workout_desc:"Legs Curls glutes"});
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
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App

        </h1>
        <div className="w-[975px] h-[450px] aspect-video">{player(vs)}</div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        </div>
      </div>
    </main>
  );
}
