import { Dispatch, SetStateAction } from "react";
export interface videoState {
  time: number
  progress: number
  workout_desc: string
  playing: boolean
}

export type setVideoState = Dispatch<SetStateAction<videoState>>;