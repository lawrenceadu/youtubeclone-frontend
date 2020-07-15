import React from "react";
import { Link } from "react-router-dom";

import VideoCard from "components/VideoCard";
import Wrapper from "../Styles/ChannelTabVideo";

export default ({ videos }) => {
  if (!videos?.length) {
    return <p>This channel hasn't posted any videos yet</p>;
  }

  return (
    <Wrapper>
      <div className="videos">
        {videos?.map((video) => (
          <Link to={`/watch/${video.id}`} key={video.id}>
            <VideoCard nousername={true} hideavatar={true} video={video} />
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};
