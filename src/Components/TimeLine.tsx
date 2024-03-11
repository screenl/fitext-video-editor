import React, { useState } from "react"; // Merged React imports and removed unused import
import { Boxes } from "./TimeLineGadgets/ResizableBoxes";
import { Rows } from "./TimeLineGadgets/rows";

// Define the structure of a single event
interface TimeLineEvent {
  id: number;
  date: string;
  activity: string;
  duration: string;
  notes: string;
}

// Mock data for the timeline
const events: TimeLineEvent[] = [
  {
    id: 1,
    date: "2024-02-24",
    activity: "Running",
    duration: "30 mins",
    notes: "Felt great!",
  },
  {
    id: 2,
    date: "2024-02-23",
    activity: "Cycling",
    duration: "45 mins",
    notes: "Challenging hill sections.",
  },
  // Add more events as needed
];

/* function Boxes({ progress, videoDuration }) {
  const filledBoxes = Math.floor((progress / videoDuration) * 100);
  const emptyBoxes = 100 - filledBoxes;

  return (
    <div>
      {Array(filledBoxes)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="box filled" />
        ))}
      {Array(emptyBoxes)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="box empty" />
        ))}
    </div>
  );
}  */

export default function TimeLine() {
  // Example state for video progress and duration
  // const [videoDuration] = useState(100); // Placeholder values

  // Placeholder for Rows component definition if needed
  // const Rows = ...

  return (
    <div>
      {/* {events.map((event) => (
        <div key={event.id} style={{ marginBottom: "20px" }}>
          <h3>
            {event.date} - {event.activity}
          </h3>
          <p>Duration: {event.duration}</p>
          <p>Notes: {event.notes}</p>
        </div>
      ))} */}

      <div className="flex justify-center bg-white text-black">
        <div className="flex h-64 w-full content-stretch items-stretch overflow-x-auto">
          <Rows></Rows>
          <div className="flex flex-1 overflow-x-scroll">
            <Boxes></Boxes>
          </div>
        </div>
      </div>
    </div>
  );
}
