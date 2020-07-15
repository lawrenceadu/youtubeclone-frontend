import React, { useGlobal } from "reactn";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// components
import BottomBar from "views/Layouts/BottomBar";
import Sidebar from "views/Layouts/Sidebar";
import Navbar from "views/Layouts/Navbar";

// styles
import Container from "styles/Container";

// pages
import Auth from "views/Auth";
import Home from "views/Home";
import Feed from "views/Feed";
import Channel from "views/Channel";
import WatchVideo from "views/WatchVideo";
import SearchResults from "views/SearchResults";

export default () => {
  const [isAuthenticated] = useGlobal("isAuthenticated");
  const [hideNavbar] = useGlobal("navbar");

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <React.Fragment>
          <Navbar />
          <Sidebar />
          <BottomBar />
          <Container {...(hideNavbar && { hide: true })}>
            <Switch>
              {}
              <Route
                exact
                path="/results/:searchterm"
                component={SearchResults}
              />
              <Route exact path="/watch/:videoId" component={WatchVideo} />
              <Route exact path="/channel/:userId" component={Channel} />
              <Route path="/feed" component={Feed} />
              <Route path="/" component={Home} />
              <Redirect to="/" />
            </Switch>
          </Container>
        </React.Fragment>
      ) : (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Redirect to="/auth" />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export const namedRoutes = {
  channel: "/channel/:userId",
  results: "/results/:searchterm",
  watch: "/watch/:videoId",
  home: "/",
  feed: {
    trending: "/feed/trending",
    history: "/feed/history",
    library: "/feed/library",
    videos: "/feed/my-videos",
    liked: "/feed/liked-videos",
    subs: "/feed/subscriptions",
  },
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
};
