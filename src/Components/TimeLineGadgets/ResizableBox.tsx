import React from 'react';
import { ResizablePanel } from "../ui/resizable";

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "~/Components/ui/dropdown-menu";

interface ResizableBoxProps {
    defaultSize: number;
    className: string;
    reps: number;
    sets: number;
    time: number;
    onRepsChange: (value: number) => void;
    onSetsChange: (value: number) => void;
    onTimeChange: (value: number) => void;
    exercise?: null | React.ReactNode;
}

const ResizableBox: React.FC<ResizableBoxProps> = ({ defaultSize, className, reps, sets, time , onRepsChange, onSetsChange, onTimeChange, exercise=null}) => {
    const handleRepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onRepsChange(Number(event.target.value));
    };

    const handleSetsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSetsChange(Number(event.target.value));
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onTimeChange(Number(event.target.value));
    };

    return (
        <ResizablePanel defaultSize={defaultSize} className={className}>
            <div className="flex items-center justify-center text-center">
                {/*<DropdownMenu>*/}
                {/*    <DropdownMenuTrigger asChild>*/}
                {/*        {exercise === null*/}
                {/*            ? <button className="btn btn-circle btn-outline btn-info text-2xl">+</button>*/}
                {/*            : {exercise}*/}
                {/*        }*/}

                {/*    </DropdownMenuTrigger>*/}
                {/*</DropdownMenu>*/}
            </div>
            <div className="flex items-center justify-center text-center">
                <label>Reps: </label>
                <input type="number" className="input" value={reps} onChange={handleRepsChange}/>
            </div>
            <div className="flex items-center justify-center text-center">
                <label>Sets: </label>
                <input type="number" className="input" value={sets} onChange={handleSetsChange}/>
            </div>
            <div className="flex items-center justify-center text-center">
                <label>Duration: </label>
                <input type="number" className="input" value={time} onChange={handleTimeChange}/>
            </div>
        </ResizablePanel>
    );
};

export default ResizableBox;