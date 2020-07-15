import React from "react";
import { Link } from "react-router-dom";

import Wrapper from "../Styles/ChannelTabChannels";

export default ({ channels }) => {
  if (!channels?.length) {
    return <p>Not subscribed to any channels yet</p>;
  }

  return (
    <Wrapper>
      {channels?.map((channel) => (
        <Link to={`/channel/${channel.id}`} key={channel.id}>
          <div className="channel">
            <img src={channel.avatar} alt="avatar" />
            <h3>{channel.username}</h3>
            <p className="secondary">{channel.subscribersCount} subscribers</p>
          </div>
        </Link>
      ))}
    </Wrapper>
  );
};
