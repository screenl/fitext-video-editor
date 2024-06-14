import ReactPlayer, { ReactPlayerProps } from "react-player";
import { videoPreview } from "./video_preview";
import { videoState, setVideoState } from "./video_state";

function secs_to_mmss(t: number) {
  return new Date(t * 1000).toISOString().slice(14, 19);
}

export default function player(
  state: videoState,
  setstate: setVideoState,
  url: string | null,
  turnOnBar: boolean,
  playerRef: boolean,
  currentPlaying: number,
  currentExLength: number,
  currentExStart: number,
  setCurrentPlaying: any,
  max_length: number,
) {
  function progressBar() {
    return (
      <div className="z-10 mb-2 mt-4 flex h-5 w-full flex-row">
        <div className="h-sm ml-4 w-20 font-sans text-base font-bold leading-none">
          <p>{secs_to_mmss(state.progress)}</p>
        </div>
        <div className="mr-4 h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-3 rounded-full bg-blue-600 "
            style={{ width: `${(state.progress / state.time) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  }

  function sideBar() {
    return (
      <div className="flex h-auto w-12 max-w-12 flex-col rounded-r-lg border-2 border-gray-300 dark:border-gray-800">
        <div
          className="flex basis-1/3 content-center justify-center"
          onClick={() => {
            setCurrentPlaying((original: number) => {
              return original - 1 >= 0 ? original - 1 : 0;
            });
          }}
        >
          <img
            src="arr.svg"
            className="w-9/12 rotate-90 scale-x-[-1] opacity-30 dark:invert"
          ></img>
        </div>
        <div
          className="flex basis-1/3 content-center justify-center"
          onClick={() => {
            setstate({ ...state, playing: !state.playing });
          }}
        >
          <img
            src="pause.svg"
            className="w-5/12 rotate-90 opacity-30 dark:invert"
          ></img>
        </div>

        <div
          className="flex basis-1/3 content-center justify-center"
          onClick={() => {
            setCurrentPlaying((original: number) => {
              return (original + 1) % max_length;
            });
          }}
        >
          <img
            src="arr.svg"
            className="w-9/12 rotate-90  opacity-30 dark:invert"
          ></img>
        </div>
      </div>
    );
  }

  function videoSpecs() {
    return (
      <div className="h-autos mb-auto flex flex-1 flex-col">
        <div className="z-10 mb-auto ml-4 mt-5 text-xl font-semibold">
          {secs_to_mmss(state.time)}
        </div>
        <div className="z-10 ml-4 text-sm font-bold">{state.workout_desc}</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-row bg-white text-black dark:bg-gray-900 dark:text-white">
      {turnOnBar && sideBar()}
      <div className="relative flex h-full w-full flex-1 flex-col">
        {videoPreview(
          state,
          setstate,
          url,
          playerRef,
          currentPlaying,
          currentExLength,
          currentExStart,
        )}
        {videoSpecs()}
        {progressBar()}
      </div>
    </div>
  );
}
