"use client";

import React, {useRef, useState} from "react";
import * as url from "url";

type Timestamp = number;

type VideoUploadProps = {
    onVideoUpload?: (url: string) => void;
};

export default function VideoUpload({ onVideoUpload }: VideoUploadProps) {
    const [timestamps, setTimestamps] = useState<Timestamp[]>([]);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onButtonClick = () => {
        fileInputRef.current?.click();
    }

    const buttonStyle = {
        cursor: 'pointer',
        position: 'relative',
        border: 'none',
        backgroundColor: 'transparent',
        padding: 0,
    };

    const hoverOverlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '50%',
        display: isHovering ? 'block' : 'none',
        background: "url('/assets/button.png')"
    };

    const hoverTextStyle = {
        position: 'absolute',
        bottom: '-35px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#FFFFFF',
        backgroundColor: '#000000',
        padding: '5px 10px',
        borderRadius: '10px',
        fontSize: '14px',
        display: isHovering ? 'block' : 'none',
        zIndex: 1,
        background: "url('/assets/button.png')"
    };


    const addTimestamp = (timestamp: Timestamp) => {
        setTimestamps([...timestamps, timestamp]);
    }
    const removeTimestamp = (timestamp: Timestamp) => {
        setTimestamps(timestamps.filter((ts) => ts !== timestamp));
    }

    const uploadVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (onVideoUpload) {
                onVideoUpload(URL.createObjectURL(file));
            }
        }
    }

    return (
        <div className="absolute top-[65%] left-[85%] flex flex-col items-center justify-around">
            {(
                <button
                    style={buttonStyle}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={onButtonClick}
                >
                    <img src="/assets/button.png" alt="Upload Video Button" />
                    <div style={hoverOverlayStyle} />
                    <div style={hoverTextStyle}>Upload</div>
                </button>
            )}

            <input ref={fileInputRef} type="file" style={{display: 'none'}} accept="video/*" onChange={uploadVideo} />
        </div>
    );
}