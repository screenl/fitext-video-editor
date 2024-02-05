import { Odor_Mean_Chey } from 'next/font/google';
import React, { useState } from 'react';
import { useRef } from 'react';
import Modal from 'react-modal';


// Alternative popup design that was developed, not currently in use

export default function PopUp({
  isOpen,
  setIsOpen,
  handleSubmit,
  timeStamp,
  inputName,
  inputReps,
  inputSets,
  exerciseName,
  reps,
  sets,
  x,
  y,
  selectDivider,
}) {
  const popupStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    content: {
      position: 'absolute',
      top: 'unset',
      left: x + 200,
      right: 'auto',
      bottom: y,
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [isFilledOut, setIsFilledOut] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };
  const handleSelClick = (e) => {
    selectDivider();
    setIsOpen(false);
  };

  const handleFormSubmit = (e) => {
    handleSubmit(e);
    setIsFilledOut(true);
    setIsEditMode(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      style={popupStyles}
    >
      <div className="flex flex-col">
        <form onSubmit={handleFormSubmit}>
          {isFilledOut && !isEditMode ? (
            <>
              <label className="dividerTimeStamp">
                {' '}
                Timestamp: {timeStamp.current.valueOf()}
              </label>
              <div>Name: {exerciseName}</div>
              <div>Repetitions: {reps}</div>
              <div>Sets: {sets}</div>
              <button
                className="editButton"
                type="button"
                style={{
                  backgroundColor: '#90EE90',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                }}
                onClick={handleEditClick}
              >
                Edit
              </button>
              <button
                className="selectButton"
                type="button"
                style={{
                  backgroundColor: '#B19CD9',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                }}
                onClick={handleSelClick}
              >
                Select
              </button>
            </>
          ) : (
            <>
              <h1 className="text-[25px] font-bold text-center pb-[20px]">
                Enter Exercise Details
              </h1>
              <label className="dividerTimeStamp">
                {' '}
                Timestamp: {timeStamp.current.valueOf()}
              </label>
              <div>
                <label className="text-[1rem] pt-[20px]"> Name: </label>
                <input
                  className="box-border rounded-[2px] bg-[#f5f5f5] py-[12px] px-[20px] my-[8px]"
                  placeholder="Enter Exercise Name"
                  type={'text'}
                  id="name"
                  name="name"
                  ref={inputName}
                  defaultValue={exerciseName}
                />
              </div>
              <div>
                <label className="text-[1rem] pt-[20px]"> Repetitions: </label>
                <input
                  className="box-border rounded-[2px] bg-[#f5f5f5] py-[12px] px-[20px] my-[8px]"
                  placeholder="Enter Number of Reps"
                  type={'text'}
                  id="reps"
                  name="reps"
                  ref={inputReps}
                  defaultValue={reps}
                />
              </div>
              <div>
                <label className="text-[1rem] pt-[20px]"> Sets: </label>
                <input
                  className="box-border rounded-[2px] bg-[#f5f5f5] py-[12px] px-[20px] my-[8px]"
                  placeholder="Enter Number of Sets"
                  type={'text'}
                  id="sets"
                  name="sets"
                  ref={inputSets}
                  defaultValue={sets}
                />
              </div>
              <div className="flex">
                <button
                  className="mt-[30px] ml-auto mr-auto cursor-pointer bg-[#f08080] w-[75px] p-[10px]"
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="mt-[30px] ml-auto mr-auto cursor-pointer w-[75px] p-[10px] bg-[#add8e6]"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </>
          )}
          <label className="dividerTimeStamp"> x,y: {x + ' ' + y}</label>
        </form>
      </div>
    </Modal>
  );
}
