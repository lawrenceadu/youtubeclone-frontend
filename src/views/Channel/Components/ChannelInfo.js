import React, { useState } from "react";
import { Link } from "react-router-dom";

import { subscribeService } from "services/channelService";
import Wrapper from "../Styles/ChannelInfo";
import Button from "styles/Button";

export default ({ channel: ch }) => {
  /**
   * state
   */
  const [channel, setChannel] = useState(ch);

  /**
   * function
   */
  const handleSubscribe = () =>
    subscribeService(channel.id) |
    setChannel({
      ...channel,
      isSubscribed: !channel?.isSubscribed,
      subscribersCount:
        channel?.subscribersCount + (!channel?.isSubscribed ? 1 : -1),
    });

  return (
    <Wrapper>
      <Link to={`/channel/${channel.id}`} className="avatar-channel">
        <img src={channel.avatar} alt="avatar" />
        <div className="channel-info-meta">
          <h3>{channel.username}</h3>
          <p className="secondary">
            <span>{channel.subscribersCount} subscribers</span>{" "}
            <span className="to-hide">•</span>{" "}
            <span className="to-hide">{channel.videosCount} videos</span>
          </p>
          {channel.channelDescription && (
            <p className="description secondary">
              {channel.channelDescription?.length < 65
                ? channel.channelDescription
                : channel.channelDescription?.substr(0, 65)}
            </p>
          )}
        </div>
      </Link>

      {!channel.isMe && !channel.isSubscribed && (
        <Button onClick={handleSubscribe} type="button">
          Subscribe
        </Button>
      )}

      {!channel.isMe && channel.isSubscribed && (
        <Button grey type="button" onClick={handleSubscribe}>
          Subscribed
        </Button>
      )}
    </Wrapper>
  );
};
