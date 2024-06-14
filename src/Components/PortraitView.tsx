import React, { useState, useEffect, useRef } from "react";
import player from "./video_player";
import { type videoState, type setVideoState } from "./video_state";
import { record } from "zod";
interface Exercise {
  name: string;
  reps: number;
  sets: number;
  time: number;
  size: number;
}

interface exerciseProp {
  exercises: Exercise[];
  currentPlaying: number;
  vs: videoState; //video state
  setvs: setVideoState; //set video state
  videoUrl: string | null; // also a state
  isLooping: boolean;
  currentExLength: number;
  currentExStart: number;
  setCurrentPlaying: any;
  maxLength: number;
}

interface recordProps {
  name: string;
  time: number;
}

const PortraitView: React.FC<exerciseProp> = ({
  exercises,
  currentPlaying,
  vs,
  setvs,
  videoUrl,
  isLooping,
  currentExLength,
  currentExStart,
  setCurrentPlaying,
  maxLength,
}) => {
  const [records, setRecords] = useState<recordProps[]>([]);

  const recordList = useRef<HTMLUListElement>(null);
  const addRecord = useEffect(() => {
    setRecords(() => {
      if (exercises.length != 0) {
        return [
          ...records,
          {
            name: exercises[currentPlaying]!.name,
            time: exercises[currentPlaying]!.time,
          },
        ];
      } else {
        return records;
      }
    });
  }, [currentPlaying]); //To be solved: if we changed the exercise of the current playing box, the records could not update.

  const scrollToBottom = useEffect(() => {
    // This effect scrolls to the bottom (revealing the new popped up exercise)
    // whenever {records} is updated.
    recordList.current!.scrollTop = recordList.current!.scrollHeight;
  }, [records]);

  return (
    <div className="ml-2 h-[450px] w-[250px] rounded-lg bg-white p-4">
      <div className="mb-4 h-[200px] rounded-lg bg-gray-200">
        {/* 竖屏上半部分留出空白放视频 false is for toggling the visibility of the side bar*/}
        {player(
          vs,
          setvs,
          videoUrl,
          false,
          isLooping,
          currentPlaying,
          currentExLength,
          currentExStart,
          setCurrentPlaying,
          maxLength,
        )}
      </div>
      {/* 大的bubble */}
      <div className="mb-4 rounded-lg bg-blue-500 p-2 text-white">
        {/* 两个平行的小bubble */}
        <div className="mb-2 flex justify-between">
          <span className="rounded-full bg-white px-2 py-1 text-sm text-blue-500">
            Set {exercises[currentPlaying]!.sets}
          </span>
          <span className="rounded-full bg-white px-2 py-1 text-sm text-blue-500">
            {exercises[currentPlaying]!.time} Sec
          </span>
        </div>
        {/* 两个进度条 */}
        <div className="mb-1 h-1 rounded-full bg-white"></div>
        <div className="h-1 rounded-full bg-white"></div>
      </div>

      {/* 从上到下的小记录之前的exercise的bubble */}
      <div
        ref={recordList}
        className="h-[125px] overflow-y-scroll align-bottom"
      >
        {records.length !== 0 &&
          records.map((record, index) => (
            <div
              key={index}
              className="mb-4 rounded-lg bg-gray-200 px-2 py-1 text-gray-500"
            >
              <div className="text-sm">{record.time} seconds</div>
              <div>{record.name}</div>
            </div>
          ))}
      </div>

      {/* 竖屏最下面的长条 */}
      <div className="flex items-center justify-between rounded-lg bg-gray-100 p-2">
        <i className="fas fa-map-marker-alt text-gray-500"></i>
        <i className="fas fa-chevron-left text-gray-500"></i>
        <i className="fas fa-pause text-gray-500"></i>
        <i className="fas fa-chevron-right text-gray-500"></i>
      </div>
    </div>
  );
};

export default PortraitView;
