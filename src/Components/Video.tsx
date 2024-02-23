"use client";

import React, {useState} from "react";

type Timestamp = number;

function Video() {
    const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const [timestamps, setTimestamps] = useState<Timestamp[]>([]);

    const addTimestamp = (timestamp: Timestamp) => {
        setTimestamps([...timestamps, timestamp]);
    }
    const removeTimestamp = (timestamp: Timestamp) => {
        setTimestamps(timestamps.filter((ts) => ts !== timestamp));
    }

    const uploadVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setVideoFile(file);
        }
    }

    const onVideoLoaded = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        setVideoElement(event.currentTarget);
    }

    // TODO: set timeline function
    // ....

    return (
        <div>
            <input type="file" accept="video/*" onChange={uploadVideo} />
            <video
                src={videoFile ? URL.createObjectURL(videoFile) : ""}
                controls
                onLoadedData={onVideoLoaded}
            />
        </div>
    );
}

export default Video;