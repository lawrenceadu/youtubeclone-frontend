import React from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";

import StyledTrending from "styles/Trending";
import TrendingCard from "views/Components/TrendingCard";
import Skeleton from "skeletons/TrendingSkeleton";

export default ({ nopad }) => {
  const { data: videos, error } = useSWR("/users/history");

  if (!videos && !error) {
    return <Skeleton />;
  }

  return (
    <StyledTrending nopad={nopad}>
      <h2>History</h2>

      {!videos?.length && (
        <p className="secondary">
          Videos that you have watched will show up here
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
