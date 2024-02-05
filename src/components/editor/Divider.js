import divider from '../../assets/divider.svg';
import selectedDividerLine from '../../assets/selected_divider_line.svg';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useRef } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import Draggable from 'react-draggable';
import { resolve } from 'styled-jsx/css';
import PopUp from './PopUp.js';
import SelectExcercise from '../../Services/SelectExcercise.js';
import { SelectedExcerciseContext } from '../../contexts/SelectedExcerciseContext';
import { joinClasses } from '@/utils/joinClasses';
import { useIsOverflow } from '@/hooks/useIsOverflow';

/* ----------------------------------------------------------
  Divider Class: 
  Each instance of this class represents a draggable divider
  and a table column. Each divider owns the table column to
  the right of it, which represents the exercise info stored 
  at the next divider. ie. entering exercise info in the column
  owned by divider #2 updates the info for exercise #3. 
    ---------------------------------------------------------- */

export default function Divider({   
  id,
  index,
  x,
  y,
  exerciseName,
  reps,
  sets,
  vidLength,
  jumpToTime,
  timeStamp,
  isDead,
}) {
  const { selectedExercise, setSelectedExercise, exercises, setExercises } =
    useContext(SelectedExcerciseContext);

  const [isOpen, setIsOpen] = useState(false);
  const startDrag = [];
  const inputName = useRef(null);
  const inputReps = useRef(null);
  const inputSets = useRef(null);
  const videoLength = vidLength;

  useEffect(() => {
    if(!inputName || !inputName.current) return;

    setExercises((oldExcersises) => {
      const newExcersises = [...oldExcersises];
      newExcersises[index].ref = inputName;
      return newExcersises;
    })
  }, [index, setExercises, inputName])

  const startDragHandler = (e) => startDrag.push(e.clientX);

  const stopDragHandler = (e, data) => {   // When the user drops dragging a divider, location and timestamp of that divider are updated and stored
    setExercises((oldDivider) => {
      const newDivider = [...oldDivider];
      const indexOfModification = newDivider.findIndex(
        (divider) => divider.id === id,
      );
      if (indexOfModification > 0) {
      newDivider[indexOfModification - 1].timeStamp = formatTime((data.x / (exercises[exercises.length-1].x - exercises[0].x)) * videoLength);  // timestamp of current exercise is stored in the timestamp value of the last exercise
      if (indexOfModification == exercises.length - 1) {
      newDivider[indexOfModification].timeStamp = formatTime(((data.x + 50)  / (exercises[exercises.length-1].x - exercises[0].x)) * videoLength);  //set default timestamp for the next divider that might be added
      }
      }
      newDivider[indexOfModification].x = data.x;
      return newDivider;
    });
  };

  const selectDivider = () => {  //clicking on a divider makes it the currently selected exercise, updates horizontal phone to the correct timestamp
    setSelectedExercise({
      id: id,
      index: index,
      exerciseName: exerciseName,
      timeStamp: timeStamp,
    });
    if (index == 0) {
      jumpToTime(0);
    }
    else {
      jumpToTime((exercises[index-1].x / (exercises[exercises.length-1].x - exercises[0].x)) * videoLength);
    }
  };

  const handleBlur = (e) => {   //saves input values when the user clicks off of the input, saves to index + 1 because the column that is being edited is describing the next exercise
    setExercises((oldDivider) => {
      const newDivider = [...oldDivider];
      const indexOfModification = newDivider.findIndex(
        (divider) => divider.id === id,
      );
      if (inputName.current.value) {
      newDivider[indexOfModification+1].exerciseName = inputName.current.value;
      }
      if (inputReps.current.value) {
      newDivider[indexOfModification+1].reps = inputReps.current.value;
      }
      if (inputSets.current.value) {
      newDivider[indexOfModification+1].sets = inputSets.current.value;
      }
      return newDivider;
    });
  }

  const formatTime = (seconds) => {  // time formatting helper method
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    if (h > 0)
      return `${h}:${m.toString().padStart(2, '0')}:${s
        .toString()
        .padStart(2, '0')}`;

    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const nextDivider = index + 1 < exercises.length ? exercises[index + 1] : exercises[exercises.length - 1];
  const prevDivider = index > 0 ? exercises[index - 1] : exercises[0];
  const firstDivider = exercises[0];
  const lastDivider = exercises[exercises.length - 1];

  const gradientStyle =
    selectedExercise.id === id
      ? { background: 'linear-gradient(180deg, #2ED82A 0%, #5EF37F 100%)' }
      : { background: 'linear-gradient(180deg, #FFE665 0%, #FAB505 100%)' };

  const lineStyle =
    selectedExercise.id === id
      ? { background: 'linear-gradient(180deg, #2ED82A 0%, #5EF37F 100%)' }
      : { width: 0, height: 0 };
    
  const DividerLine = ({ style }) => (
    <div 
      style={{...style, 
              width: `calc((((${x} - ${prevDivider.x}) / (${lastDivider.x} - ${firstDivider.x})) * 100%) - 24px)`,
              pointerEvents: 'none'
            }}
      className="w-full h-[3px] absolute -translate-x-full bottom-[50px]"
    />
  );

  return (
    <Draggable
      axis="x"
      position={{ x, y }}
      bounds={{
        left: index !== 0 ? exercises[index - 1].x + 10 : 0,
        right: index !== exercises.length - 1 ? exercises[index + 1].x - 10 : 1250,
      }}
      disabled={index === 0 || index === exercises.length - 1}
      onStart={startDragHandler}
      onStop={stopDragHandler}
    >
      <div>
        <div style={{width: `calc((${nextDivider.x} - ${x}) * 1px)`}} className={`h-[445px] absolute`}>
          <button
            className="flex flex-col items-center h-full mt-[-4rem]"
            onClick={selectDivider}
          >
            <div
              style={gradientStyle}
              className="w-[26px] h-[26px] rounded-full text-white text-[20px] font-bold flex items-center justify-center"
            >
              <span>{id === 'S' ? 'S' : id === 'E' ? 'E' : index}</span>
            </div>
            <div style={gradientStyle} className="w-[1px] h-full"></div>
          </button>
          {index !== exercises.length - 1 && (
            <div className="w-full absolute bottom-[35%] left-4 flex flex-col">
                <input
                  className="box-border rounded-[2px] bg-white py-[12px] px-[20px] border-t-2 border-[#45C2FC] text-center"
                  placeholder="Enter Exercise Name"
                  type={'text'}
                  id="name"
                  name="name"
                  ref={inputName}
                  defaultValue={exercises[index + 1].exerciseName}
                  onBlur={handleBlur}
                />
                <input
                  className="box-border rounded-[2px] bg-white py-[12px] px-[20px] border-t-2 border-[#45C2FC] text-center"
                  placeholder="Enter Number of Reps"
                  type={'text'}
                  id="reps"
                  name="reps"
                  ref={inputReps}
                  defaultValue={exercises[index + 1].reps}
                  onBlur={handleBlur}
                />
                <input
                  className="box-border rounded-[2px] bg-white py-[12px] px-[20px] border-t-2 border-[#45C2FC] border-b-2 text-center"
                  placeholder="Enter Number of Sets"
                  type={'text'}
                  id="sets"
                  name="sets"
                  ref={inputSets}
                  defaultValue={exercises[index + 1].sets}
                  onBlur={handleBlur}
                />
                <label className="text-center pt-3 pb-3 border-b-2 border-[#45C2FC]" placeholder="Time">
                  {index != exercises.length - 2 ?  timeStamp : formatTime(vidLength)} 
                </label>
              </div>
          )}
        </div>

        <DividerLine style={lineStyle}/>

      </div>
    </Draggable>
    
  );
}
