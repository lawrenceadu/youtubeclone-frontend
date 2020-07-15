import React, { useEffect, useGlobal } from "reactn";
import { Link, useParams } from "react-router-dom";
import { Img } from "react-image";
import useSWR from "swr";

import { LikeIcon, DislikeIcon } from "components/Icons";
import { subscribeService } from "services/channelService";
import { http, timesince } from "utils";
import VideoCard from "components/VideoCard";
import NoResults from "components/NoResults";
import Comments from "./WatchVideo/Components/Comments";
import Skeleton from "skeletons/WatchVideoSkeleton";
import Wrapper from "./WatchVideo/Styles/WatchVideoWrapper";
import Button from "styles/Button";
import Player from "components/Player";

export default () => {
  const { videoId } = useParams();
  const [, setNavbar] = useGlobal("navbar");
  const [, setBottombar] = useGlobal("bottombar");

  /**
   * api
   */
  const { data: video, error: videoError, mutate: videoMutate } = useSWR(
    `/videos/${videoId}`
  );
  const { data: videos } = useSWR("/videos");

  /**
   * functions
   */
  const handleLike = ({ id, likesCount, isDisliked, dislikesCount }) =>
    http.get(`/videos/${id}/like`) |
    handleMutate({
      isLiked: true,
      isDisliked: false,
      likesCount: likesCount + 1,
      ...(isDisliked && { dislikesCount: dislikesCount - 1 }),
    });

  const handleCancelLike = ({ id, likesCount }) =>
    http.get(`/videos/${id}/like`) |
    handleMutate({ isLiked: false, likesCount: likesCount - 1 });

  const handleDislike = ({ id, dislikesCount, isLiked, likesCount }) =>
    http.get(`/videos/${id}/dislike`) |
    handleMutate({
      isDisliked: true,
      isLiked: false,
      dislikesCount: dislikesCount + 1,
      ...(isLiked && { likesCount: likesCount - 1 }),
    });

  const handleCancelDislike = ({ id, dislikesCount }) =>
    http.get(`/videos/${id}/dislike`) |
    handleMutate({ isDisliked: false, dislikesCount: dislikesCount - 1 });

  const handleSubscribe = ({ userId, isSubscribed, subscribersCount }) =>
    subscribeService(userId) |
    handleMutate({
      isSubscribed: !isSubscribed,
      subscribersCount: subscribersCount + (!isSubscribed ? 1 : -1),
    });

  const handleMutate = (payload) =>
    videoMutate({ ...video, ...payload }, false);

  /**
   * effect
   */
  useEffect(() => {
    if (window.innerWidth <= 500) {
      setBottombar(true);
    }
    return () => setBottombar(false);
  }, [setNavbar, setBottombar]);

  /**
   * if video not found
   */
  if (videoError)
    return (
      <NoResults
        title="Page not found"
        text="The page you are looking for is not found or it may have been removed"
      />
    );

  /**
   * if video is loading
   */
  if (!video && !videoError) return <Skeleton />;

  return (
    <Wrapper filledLike={video?.isLiked} filledDislike={video?.isDisliked}>
      <div className="video-container">
        <div className="video">
          <Player {...{ video }} />
        </div>

        <div className="video-info">
          <h3>{video.title}</h3>

          <div className="video-info-stats">
            <p>
              <span>{video.views} views</span> <span>•</span>{" "}
              <span>{timesince(video.createdAt)} ago</span>
            </p>

            <div className="likes-dislikes flex-row">
              <p className="flex-row like">
                <LikeIcon
                  onClick={() =>
                    video?.isLiked ? handleCancelLike(video) : handleLike(video)
                  }
                />{" "}
                <span>{video.likesCount}</span>
              </p>
              <p className="flex-row dislike" style={{ marginLeft: "1rem" }}>
                <DislikeIcon
                  onClick={() =>
                    video?.isDisliked
                      ? handleCancelDislike(video)
                      : handleDislike(video)
                  }
                />{" "}
                <span>{video.dislikesCount}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="channel-info-description">
          <div className="channel-info-flex">
            <div className="channel-info flex-row">
              <Img
                src={video.User?.avatar || "https://via.placeholder.com/150"}
                className="avatar md"
                alt="channel avatar"
              />
              <div className="channel-info-meta">
                <h4>
                  <Link to={`/channel/${video.userId}`}>
                    {video.User?.username}
                  </Link>
                </h4>
                <span className="secondary small">
                  {video.subscribersCount} subscribers
                </span>
              </div>
            </div>
            {!video.isVideoMine && !video.isSubscribed && (
              <Button onClick={() => handleSubscribe(video)}>Subscribe</Button>
            )}
            {!video.isVideoMine && video.isSubscribed && (
              <Button grey onClick={() => handleSubscribe(video)}>
                Subscribed
              </Button>
            )}
          </div>

          <p>{video.description}</p>
        </div>
        <Comments {...{ video, videoMutate }} />
      </div>

      <div className="related-videos">
        <h3 style={{ marginBottom: "1rem" }}>Up Next</h3>
        <div className="related-videos-content">
          {videos
            ?.filter((vid) => vid.id !== video.id)
            .slice(0, 3)
            .map((video) => (
              <Link key={video.id} to={`/watch/${video.id}`}>
                <VideoCard key={video.id} hideavatar={true} video={video} />
              </Link>
            ))}
        </div>
      </div>
    </Wrapper>
  );
};
