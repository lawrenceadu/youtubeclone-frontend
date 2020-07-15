import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";

import { namedRoutes } from "Router";
import StyledTrending from "styles/Trending";
import TrendingCard from "views/Components/TrendingCard";
import Skeleton from "skeletons/TrendingSkeleton";

export default () => {
  /**
   * state
   */
  const [videos, setVideos] = useState(null);

  /**
   * api
   */
  const { data, error } = useSWR("/videos");

  /**
   * effect
   */
  useEffect(() => {
    if (data && !videos) {
      data.sort((a, b) => b.views - a.views);
      setVideos(data);
    }
  }, [data, videos]);

  return (
    <React.Fragment>
      {!videos && !error && <Skeleton />}
      {videos && (
        <StyledTrending>
          <h2>Trending</h2>
          <div className="trending">
            {videos.map((video, key) => (
              <Link
                key={key}
                to={namedRoutes.watch.replace(":videoId", video.id)}
              >
                <TrendingCard key={key} video={video} />
              </Link>
            ))}
          </div>
        </StyledTrending>
      )}
    </React.Fragment>
  );
};
