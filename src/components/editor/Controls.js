import add_exercise_button from '../../assets/add_exercise.svg';
import post_workout_button from '../../assets/post_workout.svg';
import upload_video_button from '../../assets/upload_video_button.svg';
import React, { useContext, useState } from 'react';
import Image from 'next/image';
import { SelectedExcerciseContext } from '@/contexts/SelectedExcerciseContext';

// Buttons to the right of the timeline 

export default function Controls(vidLength) {
  const { setExercises } = useContext(SelectedExcerciseContext);
  const [isUploaded, setIsUploaded] = useState(false);
  const buttonStyle = {
    cursor: 'pointer',
    marginBottom: '50px',
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    if (h > 0)
      return `${h}:${m.toString().padStart(2, '0')}:${s
        .toString()
        .padStart(2, '0')}`;

    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute top-[65%] left-[85%] flex flex-col items-center justify-around">
      {!isUploaded && (
        <button
          style={buttonStyle}
          onClick={() => {
            setIsUploaded(true);
          }}
        >
          <Image src={upload_video_button} alt="Upload Video Button" />
        </button>
      )}
      {isUploaded && (
        <>
          <button
            style={buttonStyle}
            onClick={() =>           // handles the addition of a new divider when the user clicks "Add Exercise" button
              setExercises((oldExercises) => {
                const itemE = oldExercises.find((a) => a.id === 'E');
                const arrayLength = oldExercises.length;
                let newX;

                if (oldExercises[arrayLength - 2].x + 50 > itemE.x) {
                  newX = itemE.x - 10;
                } else {
                  newX = oldExercises[arrayLength - 2].x + 50;
                }

                const newDivider = {
                  id: oldExercises.length,
                  x: newX,
                  y: 0,
                  timeStamp: formatTime(((newX + 50) / 1500) * vidLength.vidLength),  //default values for the timestamp of the next divider
                };

                if (oldExercises.length == 2) {  // if divider #1 is being added, timestamp info must be stored in divider 'S'
                  const newSDivider = oldExercises[0]; 
                  newSDivider.timeStamp =  formatTime((50 / 1500) * vidLength.vidLength);
                  const FirstNewExercises = [
                    newSDivider,
                    newDivider,
                    oldExercises[oldExercises.length - 1],
                  ];
                  return FirstNewExercises;
                }
                
                const newExercises = [
                  ...oldExercises.slice(0, oldExercises.length - 1),
                  newDivider,
                  oldExercises[oldExercises.length - 1],
                ];
                return newExercises;
              })
            }
          >
            <Image src={add_exercise_button} alt="Add exercise button" />
          </button>

          <button
            style={buttonStyle}
            onClick={() => {
              console.log('Hello from bottom control button');
            }}
          >
            <Image src={post_workout_button} alt="Post workout button" />
          </button>
        </>
      )}
    </div>
  );
}
