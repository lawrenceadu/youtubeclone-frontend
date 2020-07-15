import React, { useState, useDispatch } from "reactn";

import { SignoutIcon } from "components/Icons";
import EditProfileModal from "./EditProfileModal";
import Wrapper from "../Styles/EditProfile";
import Button from "styles/Button";

export default () => {
  /**
   * state
   */
  const [modal, setModal] = useState(false);

  /**
   * dispatch
   */
  const logout = useDispatch("auth.logout");

  return (
    <React.Fragment>
      <Wrapper>
        <div>
          <Button grey onClick={() => setModal(true)}>
            Edit Profile
          </Button>
          <SignoutIcon onClick={() => logout()} />
        </div>
      </Wrapper>
      {modal && <EditProfileModal closeModal={() => setModal(false)} />}
    </React.Fragment>
  );
};
