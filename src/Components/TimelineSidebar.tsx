import React, { useEffect, useState } from "react";

interface TimelineSidebarProps {
  exercises: Array<{
    name: string;
    reps: number;
    sets: number;
    time: number;
    size: number;
  }>;
  progress: number;
  totalDuration: number;
  timelineScrollPosition: number;
  timelineVisibleHeight: number;
  timelineTotalHeight: number;
}

const TimelineSidebar: React.FC<TimelineSidebarProps> = ({
  exercises,
  progress,
  totalDuration,
  timelineScrollPosition,
  timelineVisibleHeight,
  timelineTotalHeight,
}) => {
  const [pins, setPins] = useState<Array<{ top: number; height: number }>>([]);
  const [highlight, setHighlight] = useState<{ top: number; height: number }>({
    top: 0,
    height: 0,
  });

  useEffect(() => {
    const heightPerSecond = 100 / totalDuration; // Assuming the total height of the sidebar is 100

    const newPins = exercises.map((exercise) => {
      const top = exercise.time * heightPerSecond;
      const height = exercise.size * heightPerSecond;
      return { top, height };
    });

    setPins(newPins);

    const currentExercise = exercises.find(
      (exercise) =>
        progress >= exercise.time && progress < exercise.time + exercise.size,
    );
    if (currentExercise) {
      const top = currentExercise.time * heightPerSecond;
      const height = currentExercise.size * heightPerSecond;
      setHighlight({ top, height });
    }

    const highlightTop = (timelineScrollPosition / timelineTotalHeight) * 100;
    const highlightHeight = (timelineVisibleHeight / timelineTotalHeight) * 100;
    setHighlight({ top: highlightTop, height: highlightHeight });
  }, [
    exercises,
    progress,
    totalDuration,
    timelineScrollPosition,
    timelineVisibleHeight,
    timelineTotalHeight,
  ]);

  return (
    <div className="sidebar">
      {pins.map((pin, index) => (
        <div
          key={index}
          className="pin"
          style={{ top: `${pin.top}%`, height: `${pin.height}%` }}
        />
      ))}
      <div
        className="highlight"
        style={{ top: `${highlight.top}%`, height: `${highlight.height}%` }}
      />
    </div>
  );
};

export default TimelineSidebar;
