import dynamic from 'next/dynamic';
import { setVideoState, videoState } from './video_state';
import { OnProgressProps } from 'react-player/base';
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }); 

export function videoPreview(state: videoState,setstate: setVideoState){

  return (
    <div className="z-0 flex items-center absolute w-full h-full">
      <div className="flex justify-center w-full h-[70%]">
      <ReactPlayer width="90%" height="100%" url='demo_video.mp4' 
        playing={state.playing}
        onProgress={(statep:OnProgressProps) => {
          setstate({...state,progress:statep.playedSeconds});
        }}
        />
      </div>
    </div>
  )
}