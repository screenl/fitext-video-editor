import Divider from './Divider';
import video_preview from '../../assets/video_preview.svg';
import Image from 'next/image';
import { useContext, useEffect, useRef } from 'react';
import { SelectedExcerciseContext } from '@/contexts/SelectedExcerciseContext';

// The area of the app where the user edits video, includes video bar, dividers, and table

export default function Timeline({ vidLength, jumpToTime }) {
  const { exercises, setExercises, zoom, setZoom } = useContext(SelectedExcerciseContext);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    if (imageContainerRef.current) {
      const width = imageContainerRef.current.offsetWidth;
      setExercises((old) => {
        const oldExcersises = [...old];
        oldExcersises[oldExcersises.length - 1].x = width - 13; //this is jank
        return oldExcersises
      })
    }
  }, [setExercises])

  
  useEffect(() => {  // handles zoom function of timeline, table columns expand and shrink based on user entry
    const availableZooms = [1, 1.1, 1.25, 1.5, 2, 2.5, 3, 4, 5];
    let selectedZoom = 1;

    //break if everything doesn't have a ref
    for(let i = 0; i < exercises.length - 1; i++) {
      const input = exercises[i].ref;
      if(!input || !input.current) return;
    }

    //check if overflowing currently
    let OneOrMoreOverflow = false;
    for(let i = 0; i < exercises.length - 1; i++) {
      const input = exercises[i].ref;
      const {current} = input;

      if (current.clientWidth * zoom < current.scrollWidth) {
        OneOrMoreOverflow = true;
      }
    }
    if(!OneOrMoreOverflow) return;

    //find the optimal zoom that works for every excersise 
    for(let i = 0; i < exercises.length - 1; i++) {
      const input = exercises[i].ref;
      const {current} = input;
      //check if the input ref is overflowing, if so, increase the zoom
      for(const newZoom in availableZooms) {
        if (current.clientWidth * newZoom >= current.scrollWidth && newZoom >= selectedZoom) {
          selectedZoom = newZoom;
          break;
        }
      }
    }
   
    if(Number(selectedZoom) === 1) return;

    setExercises((oldExcersises) => {
      const newExcersises = [...oldExcersises];
      for(let i = 1; i < newExcersises.length; i++) 
        newExcersises[i].x = (newExcersises[i].x + 10) * selectedZoom;
      return newExcersises;
    })
    setZoom(selectedZoom)
  }, [exercises, setExercises, zoom, setZoom])

  return (
    <div className="w-[85%] h-[40vh] pt-[75px] px-[50px] flex relative">
      <div className="absolute w-[14%] h-full">
        <div className="w-full relative top-14 left-2 flex flex-col">
          <label className="box-border rounded-[2px] bg-white py-[12px] px-[20px] border-t-2 border-[#45C2FC] text-center">
            Exercise
          </label>
          <label className="box-border rounded-[2px] bg-white py-[12px] px-[20px] border-t-2 border-[#45C2FC] text-center">
            Repetitions
          </label>
          <label className="box-border rounded-[2px] bg-white py-[12px] px-[20px] border-t-2 border-[#45C2FC] border-b-2 text-center">
            Sets
          </label>
          <label className="text-center pt-3 pb-3 border-b-2 border-[#45C2FC]" placeholder="Time">
            Time
          </label>
        </div>
      </div>
      <div ref={imageContainerRef} className="w-full h-[75px]">
        <Image
          className="w-[84.5%] ml-[15.5%]"
          src={video_preview}
          alt="Video Preview"
          objectFit="contain"
        />
      </div>

      <div className="absolute w-[78%] left-[18%] top-10 h-full overflow-x-auto overflow-y-hidden">
        {exercises.map((divider, index) => (
          <Divider
            key={`Divider-${divider.x}-${divider.id}`}
            id={divider.id}
            x={divider.x}
            y={divider.y}
            jumpToTime={jumpToTime}
            timeStamp={divider.timeStamp}
            index={index}
            exerciseName={divider.exerciseName}
            reps={divider.reps}
            sets={divider.sets}
            vidLength={vidLength}
          />
        ))}
      </div>
    </div>
  );
}