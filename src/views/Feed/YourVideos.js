import React, { useGlobal } from "reactn";

import Channel from "../Channel";

export default () => {
  const [user] = useGlobal("user");

  return <Channel loggedInUserId={user.id} />;
};
