"use client";

import React, { useRef } from "react";

type VideoUploadProps = {
  onVideoUpload?: (url: string) => void;
};

export default function VideoUploadButton({ onVideoUpload }: VideoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (onVideoUpload) {
        onVideoUpload(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div>
      {
        <button className="w-50 btn btn-warning m-5" onClick={onButtonClick}>
          Add Video
          {/*<img src="/assets/button.png" alt="Upload Video Button" />*/}
          {/*<div style={hoverTextStyle}>Upload</div>*/}
        </button>
      }

      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        accept="video/*"
        onChange={uploadVideo}
      />
    </div>
  );
}
