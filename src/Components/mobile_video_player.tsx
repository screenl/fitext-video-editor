import { videoPreview } from "./video_preview";
import { type videoState, type setVideoState } from "./video_state";

const secs_to_mms = (t: number) => {
  return new Date(t * 1000).toISOString().slice(14, 19);
};

export default function MobileVideoPlayer(
  state: videoState,
  setstate: setVideoState,
  url?: string | null,
) {
  const progressBar = () => {
    return (
      <div className="z-10 mb-2 mt-4 flex h-5 w-full flex-row">
        <div className="h-sm ml-4 w-20 font-sans text-base font-bold leading-none">
          <p>{secs_to_mms(state.progress)}</p>
        </div>
        <div className="mr-4 h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-3 rounded-full bg-blue-600 "
            style={{ width: `${(state.progress / state.time) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const videoSpecs = () => {
    return (
      <div className="h-autos mb-auto flex flex-1 flex-col">
        <div className="mb-1 mb-auto ml-0 mt-2 text-xl font-semibold">
          {secs_to_mms(state.time)}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-row bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="relative flex h-full w-full flex-1 flex-col">
        {videoPreview(state, setstate, url)}
        {videoSpecs()}
        {progressBar()}
      </div>
    </div>
  );
}
