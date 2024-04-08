import React from 'react';
import { ResizablePanel } from "../ui/resizable";

interface ResizableBoxProps {
    defaultSize: number;
    className: string;
    reps: number;
    sets: number;
    time: number;
    exercise?: null | React.ReactNode;
}

const ResizableBox: React.FC<any> = ({defaultSize, className, reps, sets, time , exercise=null, setSize}) => {
    return (
        <ResizablePanel defaultSize={defaultSize} className={className} onResize={(size,_)=>{setSize(size);}}>
            <div className="flex items-center justify-center text-center">
              <button className="btn btn-circle btn-outline btn-info text-2xl">
                +
              </button>
                {exercise}
            </div>
            <span className="flex items-center justify-center text-center font-semibold">
              Reps: {reps}
            </span>
            <span className="flex items-center justify-center text-center font-semibold">
              Sets: {sets}
            </span>
            <span className="flex items-center justify-center text-center font-semibold">
              Duration: {time}
            </span>
        </ResizablePanel>
    );
};

export default ResizableBox;