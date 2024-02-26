import React, { useRef, useState } from 'react';

export function videoPreview(playing: boolean){
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stop, setStop] = useState(false);

  const handleVideo = () => {
      setStop(!stop);
      if (stop === true) {
          videoRef.current!.pause();
      } else {
          videoRef.current!.play();
      }
  };

  /* the above is for testing only and should not be included in the interface */

  return (
    <div className="z-0 flex items-center absolute w-full h-full">
      <div className="flex justify-center w-full h-[70%]">
        <video ref={videoRef}>
          <source src="demo_video.mp4"></source>
        </video>
        {/* <img className="object-contain " src="your-lucky-i-dont-hurt-you.gif"></img> */}
      </div>
    </div>
  )
}