'use client';

import { useEffect, useRef, useState } from 'react';
import Controls from '../components/editor/Controls';
import Timeline from '../components/editor/Timeline';
import HorizontalPhone from '../components/phone/HorizontalPhone';
import VerticalPhone from '../components/phone/VerticalPhone';
import { ExerciseProvider } from '@/contexts/SelectedExcerciseContext';

function Home() {
  const [vidLength, setVidLength] = useState(0);
  const [currentVidTime, setCurrentVidTime] = useState(0);
  const videoRef = useRef(null);

  const jumpToTime = (timeInSeconds) => {
    const videoElement = videoRef.current;
    if (videoElement) videoElement.currentTime = timeInSeconds;
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleTimeUpdate = () =>
        setCurrentVidTime(videoElement.currentTime);

      videoElement.addEventListener('timeupdate', handleTimeUpdate);
      return () =>
        videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, [videoRef, setCurrentVidTime]);

  return (
    <ExerciseProvider>
      <div className="page min-h-screen">
        {/* Phone / Preview*/}
        <div className="flex max-h-[55vh] h-auto w-full aspect-[8/3]">
          <HorizontalPhone
            videoRef={videoRef}
            currentVidTime={currentVidTime}
            setCurrentVidTime={setCurrentVidTime}
            setVidLength={setVidLength}
          />
          <VerticalPhone />
        </div>

        {/* Editor Timeline + Controls*/}
        <div className="flex h-full w-full">
          <Timeline jumpToTime={jumpToTime} vidLength={vidLength} />
          <Controls vidLength={vidLength}/>
        </div>
      </div>
    </ExerciseProvider>
  );
}

export default Home;
