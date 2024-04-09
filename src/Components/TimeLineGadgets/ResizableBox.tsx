import React, {useEffect, useState} from 'react';
import { ResizablePanel } from "../ui/resizable";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "~/Components/ui/popover"


interface ResizableBoxProps {
    defaultSize: number;
    className: string;
    reps: number;
    sets: number;
    time: number;
    onRepsChange: (value: number) => void;
    onSetsChange: (value: number) => void;
    onTimeChange: (value: number) => void;
    onExerciseChange: (value: string) => void;
    setSize: any
    // exercise?: null | React.ReactNode;
}

interface GridProps {
    onClick: (gif: string) => void;
}

// TODO: Separate into a new component. Rename, refactor to be able to utilize exercise states properly.
const Grid: React.FC<GridProps> = ({ onClick }) => {
    const importAll = (r: unknown) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        return r.keys().map(r);
    }

const ResizableBox: React.FC<any> = ({defaultSize, className, reps, sets, time , exercise=null, setSize}) => {
    const gifFiles = importAll(require.context('public/assets/exercises', false, /\.(gif)$/));

    const [gifStates, setGifStates] = useState<string[]>(gifFiles);

    useEffect(() => {
        console.log(gifFiles);
    }, [gifFiles]);

    // TODO: swap on relative position, stylize it better
    return (
        <div className="grid grid-cols-3 gap-4 max-h-[200px] overflow-auto">
            {gifStates.map((gif) => (
                <img src={gif.default.src} onClick={() => onClick(gif)} />
            ))}
            {/*{gifStates.map(gif => (*/}
            {/*    {gif}*/}
            {/*)}*/}
        </div>
    );
};

const ResizableBox: React.FC<ResizableBoxProps> = ({ defaultSize, className, reps, sets, time , onRepsChange, onSetsChange, onTimeChange, onExerciseChange, setSize}) => {
    const [exercise, setExercise] = useState<React.ReactNode | null>(null);

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
        <ResizablePanel
        defaultSize={defaultSize} className={className} onResize={(size,prev_size=defaultSize)=>{
          console.log(size,prev_size);
          setSize(size);
          //setSize(size*prev_size/100);
        }}>
            <div className="flex items-center justify-center text-center">
                <Popover>
                    <PopoverTrigger asChild>
                        { exercise ? (
                            exercise
                        ) : (
                            <button className="btn btn-circle btn-outline btn-info text-2xl">
                                +
                            </button>
                        ) }
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <Grid onClick={(gif) => {
                            onExerciseChange(gif.default.src.split('/').pop().split('.').shift());
                            setExercise(<img src={gif.default.src} className={"max-h-20"} />);
                            console.log(exercise);
                        }} />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex items-center justify-center text-center">
                {/*<label>Reps: </label>*/}
                <input type="number" className="input h-5 w-10 text-gray-800 bg-gray-200 border-gray-300 remove-arrow" value={reps} onChange={handleRepsChange}/>
            </div>
            <div className="flex items-center justify-center text-center">
                {/*<label>Sets: </label>*/}
                <input type="number" className="input h-5 w-10 text-gray-800 bg-gray-200 border-gray-300 remove-arrow" value={sets} onChange={handleSetsChange}/>
            </div>
            <div className="flex items-center justify-center text-center">
                {/*<label>Duration: </label>*/}
                <input type="number" className="input h-5 w-10 text-gray-800 bg-gray-200 border-gray-300 remove-arrow" value={time} onChange={handleTimeChange}/>
            </div>
        </ResizablePanel>
    );
};

export default ResizableBox;