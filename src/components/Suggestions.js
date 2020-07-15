import React from "react";
import useSWR from "swr";

import StyledTrending from "styles/Trending";
import ChannelInfo from "views/Channel/Components/ChannelInfo";
import Skeleton from "skeletons/SuggestionSkeleton";

export default () => {
  const { data: channels, error } = useSWR("users");

  if (!channels && !error) {
    return <Skeleton />;
  }

  return (
    <StyledTrending>
      <h2>Suggestions For You</h2>
      {channels?.map((channel) => (
        <ChannelInfo key={channel.id} channel={channel} />
      ))}
    </StyledTrending>
  );
};
