import React, { useGlobal } from "reactn";
import { NavLink } from "react-router-dom";

import { namedRoutes } from "Router";
import Subscriptions from "views/Components/Subscriptions";
import Wrapper from "./Styles/Sidebar";
import * as Icon from "components/Icons";

export default () => {
  /**
   * state
   */
  const [sidebar = false, setSidebar] = useGlobal("sidebar");

  /**
   * function
   */
  const handleCloseSidebar = () => setSidebar(false);

  return (
    <Wrapper open={sidebar}>
      <NavLink onClick={handleCloseSidebar} exact to="/">
        <div className="icon">
          <Icon.HomeIcon />
          <span>Home</span>
        </div>
      </NavLink>

      <NavLink onClick={handleCloseSidebar} to={namedRoutes.feed.trending}>
        <div className="icon">
          <Icon.TrendingIcon />
          <span>Trending</span>
        </div>
      </NavLink>

      <NavLink onClick={handleCloseSidebar} to={namedRoutes.feed.subs}>
        <div className="icon">
          <Icon.SubIcon />
          <span>Subscriptions</span>
        </div>
      </NavLink>

      <div className="ruler"></div>

      <NavLink onClick={handleCloseSidebar} to={namedRoutes.feed.library}>
        <div className="icon">
          <Icon.LibIcon />
          <span>Library</span>
        </div>
      </NavLink>

      <NavLink onClick={handleCloseSidebar} to={namedRoutes.feed.history}>
        <div className="icon">
          <Icon.HistoryIcon />
          <span>History</span>
        </div>
      </NavLink>

      <NavLink onClick={handleCloseSidebar} to={namedRoutes.feed.videos}>
        <div className="icon">
          <Icon.VidIcon />
          <span>Your videos</span>
        </div>
      </NavLink>

      <NavLink onClick={handleCloseSidebar} to={namedRoutes.feed.liked}>
        <div className="icon">
          <Icon.LikeIcon />
          <span>Liked videos</span>
        </div>
      </NavLink>

      <div className="ruler"></div>

      <Subscriptions />
    </Wrapper>
  );
};
