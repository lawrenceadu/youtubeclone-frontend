import React, { useGlobal } from "reactn";
import { Link, useHistory } from "react-router-dom";

import { HamburgerIcon, NotificationIcon } from "components/Icons";
import UploadVideo from "views/Components/UploadVideo";
import Wrapper from "./Styles/Navbar";
import Avatar from "styles/Avatar";
import Search from "views/Components/Search";

export default () => {
  const [user] = useGlobal("user");
  const [hide = false] = useGlobal("navbar");
  const [sidebar = false, setSidebar] = useGlobal("sidebar");
  const history = useHistory();

  return (
    <Wrapper {...(hide && { hide: true })}>
      <div className="logo flex-row">
        <HamburgerIcon
          className="toggle-navhandler"
          onClick={() => setSidebar(!sidebar)}
        />
        <span
          className="pointer"
          style={{ display: "block" }}
          onClick={() => history.push("/")}
        >
          YouTube Clone
        </span>
      </div>

      <Search />

      <ul>
        <li>
          <UploadVideo />
        </li>
        <li>
          <NotificationIcon />
        </li>
        <li>
          <Link to={`/channel/${user.id}`}>
            <Avatar className="pointer" src={user.avatar} alt="user-avatar" />
          </Link>
        </li>
      </ul>
    </Wrapper>
  );
};
