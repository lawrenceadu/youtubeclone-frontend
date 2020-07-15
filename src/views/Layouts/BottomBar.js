import React, { useGlobal } from "reactn";
import { NavLink } from "react-router-dom";

import { namedRoutes } from "Router";
import * as Icons from "components/Icons";
import Wrapper from "./Styles/BottomBar";

export default () => {
  const [hide = false] = useGlobal("bottombar");

  return (
    <Wrapper {...(hide && { hide: true })}>
      <div className="icons">
        <NavLink exact to="/">
          <Icons.HomeIcon />
        </NavLink>

        <NavLink to={namedRoutes.feed.trending}>
          <Icons.TrendingIcon />
        </NavLink>

        <NavLink to={namedRoutes.feed.subs}>
          <Icons.SubIcon />
        </NavLink>

        <NavLink to={namedRoutes.feed.history}>
          <Icons.HistoryIcon />
        </NavLink>

        <NavLink to={namedRoutes.feed.liked}>
          <Icons.WatchIcon />
        </NavLink>
      </div>
    </Wrapper>
  );
};
