import React from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";

import StyledTrending from "styles/Trending";
import TrendingCard from "views/Components/TrendingCard";
import Skeleton from "skeletons/TrendingSkeleton";

export default () => {
  const { data: videos, error } = useSWR("/users/likedVideos");

  if (!videos && !error) {
    return <Skeleton />;
  }

  return (
    <StyledTrending>
      <h2>Liked Videos</h2>

      {videos?.length === 0 && (
        <p className="secondary">
          Videos that you have liked will show up here
        </p>
      )}

      {videos?.map((video) => (
        <Link to={`/watch/${video.id}`} key={video.id}>
          <TrendingCard video={video} />
        </Link>
      ))}
    </StyledTrending>
  );
};
