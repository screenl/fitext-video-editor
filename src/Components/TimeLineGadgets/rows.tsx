import React from "react";

export const Rows: React.FC = () => {
  return (
    <ul className="grid h-full grid-rows-4 flex-col items-center overflow-x-scroll px-4">
      <li>Exercise</li>
      <li>Repetitions</li>
      <li>Sets</li>
      <li>Time </li>
    </ul>
  );
};

export default Rows;
