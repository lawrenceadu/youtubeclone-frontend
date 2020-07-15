import React, { useGlobal, useEffect } from "reactn";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";

import StyledTrending from "styles/Trending";
import TrendingCard from "views/Components/TrendingCard";
import ChannelInfo from "views/Channel/Components/ChannelInfo";
import NoResults from "components/NoResults";
import Skeleton from "skeletons/TrendingSkeleton";

export default () => {
  const { searchterm } = useParams();
  const [search, setSearch] = useGlobal("search");

  /**
   * api
   */
  const { data: usersResults, error: usersError } = useSWR(
    `/users/search?searchterm=${searchterm}`
  );
  const { data: videosResults, error: videosError } = useSWR(
    `/videos/search?searchterm=${searchterm}`
  );

  /**
   * prepare loading state
   */
  const isLoading =
    !usersResults && !videosResults && !usersError && !videosError;

  /**
   * effect
   */
  useEffect(() => {
    if (searchterm !== search) setSearch(searchterm);
    return () => {
      setSearch(null);
    };
  }, [searchterm, search, setSearch]);

  if (isLoading) {
    return <Skeleton title="true" />;
  }

  if (!isLoading && !videosResults?.length && !usersResults?.length) {
    return <NoResults title="No results found" text="Try different keywords" />;
  }

  return (
    <StyledTrending>
      <h2>Search Results</h2>
      <div style={{ marginTop: "1rem" }}>
        {usersResults?.map((channel) => (
          <ChannelInfo key={channel.id} search={true} channel={channel} />
        ))}
      </div>
      {videosResults?.map((video) => (
        <Link key={video.id} to={`/watch/${video.id}`}>
          <TrendingCard video={video} />
        </Link>
      ))}
    </StyledTrending>
  );
};
