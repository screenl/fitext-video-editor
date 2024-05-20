import dynamic from "next/dynamic";
import { setVideoState, videoState } from "./video_state";
import { OnProgressProps } from "react-player/base";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export function videoPreview(
  state: videoState,
  setstate: setVideoState,
  url?: string | null,
) {
  if (!state) {
    console.error("State is undefined");
    return null;
  }

  return (
    <div className="absolute z-0 flex h-full w-full items-center">
      <div className="flex h-[70%] w-full justify-center">
        <ReactPlayer
          width="90%"
          height="100%"
          url={url ?? ""}
          playing={state.playing}
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
