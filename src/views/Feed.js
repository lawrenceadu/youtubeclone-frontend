import React from "react";
import { Route, Switch } from "react-router-dom";

import { namedRoutes } from "Router";
import Subscriptions from "./Feed/Subscriptions";
import LikedVideos from "./Feed/LikedVideos";
import YourVideos from "./Feed/YourVideos";
import Trending from "./Feed/Trending";
import History from "./Feed/History";
import Library from "./Feed/Library";

export default function Feed() {
  return (
    <Switch>
      <Route exact path={namedRoutes.feed.trending} component={Trending} />
      <Route exact path={namedRoutes.feed.library} component={Library} />
      <Route exact path={namedRoutes.feed.history} component={History} />
      <Route exact path={namedRoutes.feed.videos} component={YourVideos} />
      <Route exact path={namedRoutes.feed.liked} component={LikedVideos} />
      <Route exact path={namedRoutes.feed.subs} component={Subscriptions} />
    </Switch>
  );
}
