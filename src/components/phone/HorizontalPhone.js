import HomeBar from './HomeBar';

import flip_button from '../../assets/flip_button.svg';
import Image from 'next/image';
import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { SelectedExcerciseContext } from '../../contexts/SelectedExcerciseContext';

//handles components on horizontal phone, including video player

export default function HorizontalPhone({
  videoRef,
  setVidLength,
  currentVidTime,
  setCurrentVidTime,
}) {
  const { selectedExercise, setSelectedExercise, exercises, setExercises } =
    useContext(SelectedExcerciseContext);

  const currentTimeRef = useRef(null);
  const videoLengthRef = useRef(null);
  const [progressWidth, setProgressWidth] = useState(0);
  const currentExerciseRef = useRef(null);

  const updateVideoDuration = useCallback(() => {
    if (videoLengthRef.current) {
      videoLengthRef.current.textContent = formatTime(
        videoRef.current.duration,
      );
      setVidLength(videoRef.current.duration);
    }
  }, [videoRef, setVidLength]);

  const updateCurrentTime = useCallback(() => {
    if (currentTimeRef.current) {
      currentTimeRef.current.textContent = formatTime(
        videoRef.current.currentTime,
      );

      const percentage =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgressWidth(percentage);
    }
  }, [videoRef]);

  const updateCurrentExercise = useCallback(() => {
    let newExercises = [];
    if (exercises.length > 1) {
      newExercises = exercises.filter((ex) => {
        return (
          (ex.x / 1500) * videoRef.current.duration >
          videoRef.current.currentTime
        );
      });
      if (newExercises.length > 0) {
        currentExerciseRef.current.textContent = newExercises[0].exerciseName;
      } else {
        currentExerciseRef.current.textContent = '';
      }
    } else {
      currentExerciseRef.current.textContent =
        'Add an exercise to get started!';
    }
  }, [videoRef, exercises]);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (video.paused) video.play();
    else video.pause();
  };

  useEffect(() => {
    const curVideo = videoRef.current;
    if (curVideo) {
      curVideo.addEventListener('loadedmetadata', updateVideoDuration);
      curVideo.addEventListener('timeupdate', updateCurrentTime);
      curVideo.addEventListener('timeupdate', updateCurrentExercise);

      // This function will keep checking the video duration
      // until it's available, then it will update the duration text.
      const checkDuration = () => {
        if (curVideo.duration && !isNaN(curVideo.duration))
          updateVideoDuration();
        else setTimeout(checkDuration, 100); // Check every 100ms
      };

      checkDuration();
    }

    return () => {
      if (curVideo) {
        curVideo.removeEventListener('loadedmetadata', updateVideoDuration);
        curVideo.removeEventListener('timeupdate', updateCurrentTime);
        curVideo.removeEventListener('timeupdate', updateCurrentExercise);
      }
    };
  }, [updateCurrentTime, updateVideoDuration, updateCurrentExercise, videoRef]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    if (h > 0)
      return `${h}:${m.toString().padStart(2, '0')}:${s
        .toString()
        .padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex overflow-hidden mt-[.5%] rounded-[20px] border border-black relative aspect-[2/1] ml-auto">
      {/* Video Controls */}
      <div className="w-[3%] h-full flex left-0 ml-3">
        <HomeBar togglePlayback={toggleVideoPlayback} />
      </div>

      {/* Video */}
      <div className="w-full h-full">
        <video ref={videoRef} className="w-full h-full">
          <source src="/demo_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Details */}
      <div className="screenTextContainer">
        {/* Total Length of Video */}
        <h2
          ref={videoLengthRef}
          className="absolute top-[7%] left-[8%] text-[1.5rem] font-bold text-[#494747]"
        >
          00:00
        </h2>
        {/* Selected Exercise */}
        <h3
          ref={currentExerciseRef}
          className="absolute top-[82%] left-[8%] text-[1.5rem] font-bold text-[#494747]"
        ></h3>
        {/* Current Time of Video */}
        <h3
          ref={currentTimeRef}
          className="absolute top-[90%] left-[8%] text-[1.5rem] font-bold text-[#494747]"
        >
          00:00
        </h3>
      </div>

      {/* Progress Bar */}
      <div className="w-[78%] h-[5%] bg-[#d3d3d3] rounded-[20px] absolute left-[17%] top-[90%]">
        <div
          className="bg-[#add8e6] rounded-[20px] flex items-center justify-center w-[30%] h-full"
          style={{ width: `${progressWidth}%` }}
        ></div>
      </div>

      {/* Not sure if this is supposed to be interactive, adding as image for now */}
      <Image
        className="w-[70px] h-[70px] flex absolute right-[5%] top-[6.5%]"
        src={flip_button}
        alt="Flip Button"
        onClick={() => updateProgressBar(0.2)}
      />
    </div>
  );
}
