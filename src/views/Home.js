import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";

import { namedRoutes } from "Router";
import VideoCard from "components/VideoCard";
import VideoGrid from "styles/VideoGrid";
import Skeleton from "skeletons/HomeSkeleton";

export const StyledHome = styled.div`
  padding: 1.3rem;
  margin: 0 auto;
  padding-bottom: 7rem;
  width: 100%;

  h2 {
    margin-bottom: 1rem;
  }
`;

export default function Home() {
  /**
   * API
   */
  const { data: videos, error } = useSWR("/videos");

  return (
    <React.Fragment>
      {!videos && !error && <Skeleton title={true} />}
      {videos && (
        <StyledHome>
          <h2>Recommended</h2>
          <VideoGrid>
            {videos.map((video, key) => (
              <Link
                key={key}
                to={namedRoutes.watch.replace(":videoId", video.id)}
              >
                <VideoCard video={video} />
              </Link>
            ))}
          </VideoGrid>
        </StyledHome>
      )}
    </React.Fragment>
  );
}
