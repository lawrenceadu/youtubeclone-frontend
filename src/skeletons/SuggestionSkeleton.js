import React from "react";
import styled from "styled-components";

import { SkeletonLine, ChannelInfoSkeleton } from "styles/Skeleton";
import StyledTrending from "styles/Trending";

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
  align-items: center;
  display: flex;
`;

const SuggestionSkeleton = () => {
  return (
    <StyledTrending>
      <SkeletonLine width="350px" height="30px" mt="20px" mb="30px" />

      <Wrapper>
        <ChannelInfoSkeleton />
        <div>
          <SkeletonLine width="250px" height="20px" mb="20px" />
          <SkeletonLine width="200px" height="20px" mb="20px" />
        </div>
      </Wrapper>

      <Wrapper>
        <ChannelInfoSkeleton />
        <div>
          <SkeletonLine width="250px" height="20px" mb="20px" />
          <SkeletonLine width="200px" height="20px" mb="20px" />
        </div>
      </Wrapper>

      <Wrapper>
        <ChannelInfoSkeleton />
        <div>
          <SkeletonLine width="250px" height="20px" mb="20px" />
          <SkeletonLine width="200px" height="20px" mb="20px" />
        </div>
      </Wrapper>
    </StyledTrending>
  );
};

export default SuggestionSkeleton;
