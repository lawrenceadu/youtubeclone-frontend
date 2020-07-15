import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import ChannelTabChannels from "./Channel/Components/ChannelTabChannels";
import ChannelTabVideo from "./Channel/Components/ChannelTabVideo";
import ChannelTabAbout from "./Channel/Components/ChannelTabAbout";
import EditProfile from "./Channel/Components/EditProfile";
import NoResults from "components/NoResults";
import Skeleton from "skeletons/ChannelSkeleton";
import Wrapper from "./Channel/Styles/Channel";
import Button from "styles/Button";
import { subscribeService } from "services/channelService";

const activeTabStyle = {
  borderBottom: "2px solid white",
  color: "white",
};

export default ({ loggedInUserId }) => {
  /**
   * variables
   */
  const { userId } = useParams();

  /**
   * state
   */
  const [tab, setTab] = useState("VIDEOS");
  const [profile, setProfile] = useState(null);

  /**
   * api
   */
  const { data, error } = useSWR(`/users/${userId || loggedInUserId}`);

  /**
   * functions
   */
  const handleSubscribe = () =>
    subscribeService(profile.id) |
    setProfile({
      ...profile,
      isSubscribed: !profile?.isSubscribed,
      subscribersCount:
        profile?.subscribersCount + (!profile?.isSubscribed ? 1 : -1),
    });

  /**
   * effect
   */
  useEffect(() => {
    if (data && !profile) setProfile(data);
  }, [data, profile]);

  /**
   * if not found
   */
  if (error) {
    return (
      <NoResults
        title="Page not found"
        text="The page you are looking for is not found or it may have been removed"
      />
    );
  }

  /**
   * if loading
   */
  if (!profile && !error) {
    return <Skeleton />;
  }

  return (
    <Wrapper editProfile={profile.isMe}>
      <div className="cover">
        <img src={profile.cover} alt="channel-cover" />
      </div>

      <div className="header-tabs">
        <div className="header">
          <div className="flex-row">
            <img
              className="avatar lg"
              src={profile.avatar}
              alt="channel avatar"
            />
            <div>
              <h3>{profile.username}</h3>
              <span className="secondary">
                {profile.subscribersCount} subscribers
              </span>
            </div>
          </div>

          {profile.isMe && <EditProfile />}

          {!profile.isMe && profile.isSubscribed && (
            <Button grey onClick={handleSubscribe}>
              Subscribed
            </Button>
          )}

          {!profile.isMe && !profile.isSubscribed && (
            <Button onClick={handleSubscribe}>Subscribe</Button>
          )}
        </div>

        <div className="tabs">
          <ul className="secondary">
            <li
              style={tab === "VIDEOS" ? activeTabStyle : {}}
              onClick={() => setTab("VIDEOS")}
            >
              Videos
            </li>
            <li
              style={tab === "CHANNELS" ? activeTabStyle : {}}
              onClick={() => setTab("CHANNELS")}
            >
              Channels
            </li>
            <li
              style={tab === "ABOUT" ? activeTabStyle : {}}
              onClick={() => setTab("ABOUT")}
            >
              About
            </li>
          </ul>
        </div>
      </div>

      <div className="tab">
        {tab === "VIDEOS" && <ChannelTabVideo videos={profile?.videos} />}
        {tab === "ABOUT" && (
          <ChannelTabAbout description={profile?.channelDescription} />
        )}
        {tab === "CHANNELS" && (
          <ChannelTabChannels channels={profile?.channels} />
        )}
      </div>
    </Wrapper>
  );
};
