import React from "react";

import { SkeletonLine, VideoCardSkeleton } from "styles/Skeleton";
import { StyledHome } from "views/Home";
import VideoGrid from "styles/VideoGrid";

const HomeSkeleton = ({ title }) => {
  return (
    <StyledHome>
      {title && <SkeletonLine width="350px" height="30px" mb="30px" />}
      {!title && <div style={{ marginTop: "2rem" }} />}
      <VideoGrid>
        <VideoCardSkeleton />
        <VideoCardSkeleton />
        <VideoCardSkeleton />
        <VideoCardSkeleton />
        <VideoCardSkeleton />
        <VideoCardSkeleton />
        <VideoCardSkeleton />
        <VideoCardSkeleton />
        <VideoCardSkeleton />
      </VideoGrid>
    </StyledHome>
  );
};

export default HomeSkeleton;
