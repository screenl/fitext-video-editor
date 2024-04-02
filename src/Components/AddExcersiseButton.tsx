import React from 'react';

interface AddExerciseButtonProps {
    addExercise: () => void;
}

const AddExerciseButton: React.FC<AddExerciseButtonProps> = ({ addExercise }) => {
    return (
        <button onClick={addExercise} className="w-50 btn btn-info m-5">
            Add Exercise +
        </button>
    );
};

export default AddExerciseButton;