import React, { useEffect } from "react";
import videojs from "video.js";

import { addToHistoryService } from "services/videoService";

import "video.js/dist/video-js.css";

export default ({ previewUrl, video }) => {
  const { thumb: poster, url: src, isViewed } = video;
  let videoRef;

  useEffect(() => {
    const player = videojs(videoRef);
    if (!previewUrl) {
      player.autoplay(true);
      player.poster(poster);
      player.src(src);
      if (!isViewed && !previewUrl) addToHistoryService(video?.id);
    } else {
      player.src({ type: "video/mp4", src: previewUrl });
    }

    player.on("ended", () => {});

    return () => player.dispose();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div data-vjs-player>
        <video
          controls
          ref={(node) => (videoRef = node)}
          className="video-js vjs-fluid vjs-big-play-centered"
        />
      </div>
    </div>
  );
};
