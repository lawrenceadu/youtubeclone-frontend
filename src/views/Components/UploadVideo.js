import React, { useState } from "react";
import { toast } from "react-toastify";
import path from "path";

import { UploadIcon } from "components/Icons";
import { upload } from "utils";
import UploadVideoModal from "./UploadVideoModal";

const UploadVideo = () => {
  const [showModal, setShowModal] = useState(false);
  const [previewVideo, setPreviewVideo] = useState("");

  // to prevent blowing up cloudinary storage
  const downtime = !process.env.REACT_APP_ALLOW_UPLOAD;

  // uploaded data
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const size = file.size / 1000000;

      if (size > 30) {
        return toast.error("Sorry, the file should be less than 30MB");
      }

      const url = URL.createObjectURL(file);
      setPreviewVideo(url);
      setShowModal(true);

      if (downtime) {
        setTimeout(() => {
          setShowModal(false);
          toast.dark("Video uploads paused for now, try later");
        }, 5000);
      } else {
        const data = await upload("video", file);
        setUrl(data);

        const ext = path.extname(data);
        setThumbnail(data.replace(ext, ".jpg"));
      }
    }
  };

  return (
    <div>
      <label htmlFor="video-upload">
        <UploadIcon />
      </label>
      <input
        style={{ display: "none" }}
        id="video-upload"
        type="file"
        accept="video/*"
        onChange={handleVideoUpload}
      />
      {showModal && (
        <UploadVideoModal
          closeModal={() => setShowModal(false)}
          previewVideo={previewVideo}
          thumbnail={thumbnail}
          url={url}
        />
      )}
    </div>
  );
};

export default UploadVideo;
