import React from "react";

export const Rows: React.FC = () => {
  return (
    <ul className="grid h-full grid-rows-4 flex-col items-center px-4 remove-arrow">
      <li>Exercise</li>
      <li>Repetitions</li>
      <li>Sets</li>
      <li>Duration </li>
    </ul>
  );
};

export default Rows;
