import React, { createContext, useState, useEffect } from 'react';
export const SelectedExcerciseContext = createContext({
  selectedExercise: null,
  setSelectedExercise: () => {},
  exercises: null,
  setExercises: () => {},
});

export const ExerciseProvider = ({ children }) => {
  const [selectedExercise, setSelectedExercise] = useState({
    id: 'NULL',
    index: 'NULL',
    excerciseName: 'NULL',
    timeStamp: 'NULL',
  });
  const [exercises, setExercises] = useState([
    { id: 'S', x: -13, y: 0, ref: null },
    { id: 'E', x: -1000, y: 0, ref: null }, //this will get updated on layout calculation
  ]);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    console.log('selectedExercise updated:', selectedExercise);
  }, [selectedExercise]);

  return (
    <SelectedExcerciseContext.Provider
      value={{ selectedExercise, setSelectedExercise, exercises, setExercises, zoom, setZoom }}
    >
      {children}
    </SelectedExcerciseContext.Provider>
  );
};
