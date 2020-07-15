import React from "react";
import { Link } from "react-router-dom";

import { StyledHome } from "../Home";
import Suggestions from "components/Suggestions";
import VideoCard from "components/VideoCard";
import VideoGrid from "styles/VideoGrid";
import Skeleton from "skeletons/HomeSkeleton";
import useSWR from "swr";

export default () => {
  const { data: videos, error } = useSWR("/users/feed");

  if (!videos && !error) {
    return <Skeleton />;
  }

  if (!error && videos?.length === 0) {
    return <Suggestions />;
  }

  return (
    <StyledHome>
      <div style={{ marginTop: "1.5rem" }}></div>
      <VideoGrid>
        {videos?.map((video) => (
          <Link key={video.id} to={`/watch/${video.id}`}>
            <VideoCard key={video.id} hideavatar={true} video={video} />
          </Link>
        ))}
      </VideoGrid>
    </StyledHome>
  );
};
