import { Boxes } from "./TimeLineGadgets/ResizableBoxes";
import React from "react";
import React, { useState, useEffect } from "react";

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

import { Rows } from "./TimeLineGadgets/rows";

export default function TimeLine() {
  return (
    <div>
      {events.map((event) => (
        <div key={event.id} style={{ marginBottom: "20px" }}>
          <h3>
            {event.date} - {event.activity}
          </h3>
          <p>Duration: {event.duration}</p>
          <p>Notes: {event.notes}</p>
        </div>
      ))}
      <Boxes></Boxes>
    <div className="">
      <Boxes progress={progress} videoDuration={videoDuration} />
    </div>
  );
}

function Boxes({ progress, videoDuration }) {
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
      <Boxes></Boxes>
      <Rows></Rows>
    </div>
  );
}
