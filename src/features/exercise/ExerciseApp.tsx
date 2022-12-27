import { DropResult } from "react-beautiful-dnd"

import Box from "@mui/material/Box"

import { Exercise, Routine } from "../../models/workout"

import ExerciseForm from "./ExerciseForm"
import ExerciseList from "./ExerciseList"

interface ExerciseAppProps {
  routine: Routine
  updateRoutine: (routine: Routine) => void
}

export default function ExerciseApp({
  routine,
  updateRoutine,
}: ExerciseAppProps) {
  return (
    <Box alignItems="center" display="flex" flexDirection="column" gap={4}>
      <ExerciseForm {...{ addExercise }}>
        <ExerciseList {...{ deleteExercise, routine, handleDragEnd }} />
      </ExerciseForm>
    </Box>
  )

  function addExercise(newExercise: Exercise) {
    updateRoutine([...routine, newExercise])
  }

  function deleteExercise(exerciseId: string) {
    updateRoutine(routine.filter(({ id }) => id !== exerciseId))
  }

  function handleDragEnd({ destination, source, draggableId }: DropResult) {
    if (destination && destination.index !== source.index) {
      const exerciseIds = routine.map(({ id }) => id)
      exerciseIds.splice(source.index, 1)
      exerciseIds.splice(destination.index, 0, draggableId)
      const reorderedRoutine = []
      for (const exerciseId of exerciseIds) {
        for (const exercise of routine) {
          if (exercise.id === exerciseId) {
            reorderedRoutine.push(exercise)
            break
          }
        }
      }
      updateRoutine(reorderedRoutine)
    }
  }
}
