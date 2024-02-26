import React from 'react';

export const Rows: React.FC = () => {
  return (
    <div className="flex flex-col divide-y divide-blue-500">
      <div className="flex justify-between py-2">
        <div className="font-bold">Zoom:</div>
        <div>100</div>
      </div>
      <div className="py-2">
        <div className="font-bold">Exercise</div>
      </div>
      <div className="py-2">
        <div className="font-bold">Repetitions</div>
      </div>
      <div className="py-2">
        <div className="font-bold">Sets</div>
      </div>
      <div className="py-2">
        <div className="font-bold">Time</div>
      </div>
    </div>
  );
};

export default Rows;
