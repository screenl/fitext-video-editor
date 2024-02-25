import React from 'react';

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
  { id: 1, date: '2024-02-24', activity: 'Running', duration: '30 mins', notes: 'Felt great!' },
  { id: 2, date: '2024-02-23', activity: 'Cycling', duration: '45 mins', notes: 'Challenging hill sections.' },
  // Add more events as needed
];

export default function TimeLine() {
  return (
    <div>
      {events.map((event) => (
        <div key={event.id} style={{ marginBottom: '20px' }}>
          <h3>{event.date} - {event.activity}</h3>
          <p>Duration: {event.duration}</p>
          <p>Notes: {event.notes}</p>
        </div>
      ))}
    </div>
  );
}
