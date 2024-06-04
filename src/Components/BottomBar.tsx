import React from "react";

interface BottomBarProps {
  onPauseClick: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ onPauseClick }) => {
  return (
    <div className="bottom-0 flex h-5 w-full border-t border-gray-300 bg-gray-100 dark:border-gray-800 dark:bg-gray-800">
      <div className="flex flex-grow items-center justify-center">
        <img
          src="arr.svg"
          alt="arrow"
          className="w-4 scale-x-[-1] transform opacity-30 dark:invert"
        />
      </div>
      <div
        className="flex flex-grow items-center justify-center"
        onClick={onPauseClick}
      >
        <img
          src="pause.svg"
          alt="pause"
          className="w-3 opacity-30 dark:invert"
        />
      </div>
      <div className="flex flex-grow items-center justify-center">
        <img
          src="arr.svg"
          alt="arrow"
          className="w-4 transform opacity-30 dark:invert"
        />
      </div>
    </div>
  );
};

export default BottomBar;
