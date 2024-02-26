import React, { useState, useEffect } from "react";

export default function TimeLine() {
  const [progress, setProgress] = useState(0);
  const videoDuration = 100; // 视频总时长，这里假设为100秒

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === videoDuration) {
          clearInterval(interval);
          return oldProgress;
        }
        return Math.min(oldProgress + 1, videoDuration);
      });
    }, 1000); // 每秒更新一次

    return () => {
      clearInterval(interval);
    };
  }, [videoDuration]);

  return (
    <div className="">
      <Boxes progress={progress} videoDuration={videoDuration} />
    </div>
  );
}

function Boxes({ progress, videoDuration }) {
  const filledBoxes = Math.floor((progress / videoDuration) * 100);
  const emptyBoxes = 100 - filledBoxes;

  return (
    <div>
      {Array(filledBoxes)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="box filled" />
        ))}
      {Array(emptyBoxes)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="box empty" />
        ))}
    </div>
  );
}
