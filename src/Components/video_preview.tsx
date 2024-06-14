import dynamic from "next/dynamic";
import { setVideoState, videoState } from "./video_state";
import { OnProgressProps } from "react-player/base";
import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { set } from "zod";
// const ReactPlayerf = dynamic(() => import("react-player"), { ssr: false });

export function videoPreview(
  this: any,
  state: videoState,
  setstate: setVideoState,
  url: string | null,
  isLooping: boolean,
  currentPlaying: number,
  currentExLength: number,
  currentExStart: number,
) {
  const playerRef = React.useRef<ReactPlayer>(null);
  const handleLoop = () => {
    if (state.progress >= currentExLength+currentExStart-0.1 && isLooping) {
      console.log(state.progress,currentExLength,currentExStart);
      playerRef.current?.seekTo(currentExStart,'seconds');
    }
  };

  const activateLoop = useEffect(() => {
    handleLoop();
  }, [state.progress, playerRef]);

  if (!state) {
    console.error("State is undefined");
    return null;
  }

  return (
    <div className="absolute z-0 flex h-full w-full items-center">
      <div className="flex h-[70%] w-full justify-center">
        <ReactPlayer
          ref={playerRef}
          width="90%"
          height="100%"
          url={url ?? ""}
          playing={state.playing || isLooping}
          progressInterval={10}
          onProgress={(statep: OnProgressProps) => {
            setstate({ ...state, progress: statep.playedSeconds });
          }}
          onReady={(player) => {
            setstate({
              ...state,
              time: player.getDuration(),
              progress: 0,
              playing: false,
            });
          }}
        />
      </div>
    </div>
  );
}
