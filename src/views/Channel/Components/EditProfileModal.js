import React, { useState, useGlobal } from "reactn";
import { object, string } from "yup";
import { Formik } from "formik";
import { mutate } from "swr";

import { updateProfileService } from "services/profileService";
import { CloseIcon } from "components/Icons";
import { upload } from "utils";
import Textarea from "components/Textarea";
import Wrapper from "../Styles/EditProfileModal";
import Button from "components/Button";
import Field from "components/Field";
import { toast } from "react-toastify";

export default ({ closeModal }) => {
  /**
   * states
   */
  const [profile, setProfile] = useGlobal("user");
  const [cover, setCover] = useState("");
  const [avatar, setAvatar] = useState("");

  /**
   * image uploader
   * @param {*} e
   * @param {*} func
   */
  const handleUpload = async (e, func) => {
    const file = e.target.files[0];
    if (file) func(await upload("image", file));
  };

  return (
    <Wrapper>
      <div className="container"></div>
      <div className="edit-profile">
        <div className="modal-header">
          <h3>
            <CloseIcon onClick={() => closeModal()} />
            <span>Edit Profile</span>
          </h3>
        </div>

        <div className="cover-upload-container">
          <label htmlFor="cover-upload">
            <img
              className="pointer"
              width="100%"
              height="200px"
              src={cover || profile?.cover}
              alt="cover"
            />
          </label>
          <input
            type="file"
            accept="image/*"
            id="cover-upload"
            style={{ display: "none" }}
            onChange={(e) => handleUpload(e, setCover)}
          />
        </div>

        <div className="avatar-upload-icon">
          <label htmlFor="avatar-upload">
            <img
              src={avatar || profile?.avatar}
              className="pointer avatar lg"
              alt="avatar"
            />
          </label>
          <input
            type="file"
            accept="image/*"
            id="avatar-upload"
            style={{ display: "none" }}
            onChange={(e) => handleUpload(e, setAvatar)}
          />
        </div>

        <Formik
          validateOnMount
          validationSchema={object({
            firstname: string().required("First name is required"),
            lastname: string().required("Last name is required"),
            channelDescription: string(),
          })}
          initialValues={{
            firstname: profile?.firstname || "",
            lastname: profile?.lastname || "",
            channelDescription: profile?.channelDescription || "",
          }}
          children={(props) => <FormFields {...props} />}
          onSubmit={(params, { setSubmitting }) =>
            updateProfileService(params).then(
              () =>
                mutate(`/users/${profile.id}`, true) |
                toast.dark("Profile updated")
            ) |
            setProfile({ ...profile, ...params }) |
            closeModal()
          }
        />
      </div>
    </Wrapper>
  );
};

const FormFields = ({ handleSubmit, values, isSubmitting, isValid }) => {
  const { firstname, lastname, channelDescription } = values;

  return (
    <form>
      <Field name="firstname" value={firstname} placeholder="First name" />
      <Field name="lastname" value={lastname} placeholder="Last name" />
      <Field
        component={Textarea}
        useComponent={false}
        name="channelDescription"
        value={channelDescription}
        placeholder="Tell viewers about your channel"
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button {...{ handleSubmit, isValid, isSubmitting, value: "Save" }} />
      </div>
    </form>
  );
};
