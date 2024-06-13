import dynamic from "next/dynamic";
import { setVideoState, videoState } from "./video_state";
import { OnProgressProps } from "react-player/base";
import React, { forwardRef } from "react";
import ReactPlayer from "react-player";
const ReactPlayerf = dynamic(() => import("react-player"), { ssr: false });

interface videoPreviewProps {
  state: videoState,
  setstate: setVideoState,
  url: string | null
};

export const VideoPreview = forwardRef(
function videoPreview(
  vp: videoPreviewProps,  
  playerRef
) {
  let state = vp.state;
  let setstate = vp.setstate;
  let url = vp.url;
  if (!state) {
    console.error("State is undefined");
    return null;
  }  

  return (
    <div className="absolute z-0 flex h-full w-full items-center">
      <div className="flex h-[70%] w-full justify-center">
        <ReactPlayerf
          ref = {playerRef}
          width="90%"
          height="100%"
          url={url ?? ""}
          playing={state.playing}
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
);
