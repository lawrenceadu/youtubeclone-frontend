import React, { useState, useRef, useGlobal } from "reactn";
import { object, string } from "yup";
import { Formik } from "formik";
import { mutate } from "swr";
import { toast } from "react-toastify";

import { uploadVideoService } from "services/videoService";
import { CloseIcon } from "components/Icons";
import Textarea from "components/Textarea";
import Wrapper from "styles/UploadVideoModal";
import Player from "components/Player";
import Button from "styles/Button";
import Field from "components/Field";

export default ({ previewVideo, closeModal, url, thumbnail }) => {
  const [tab, setTab] = useState("PREVIEW");
  const [user] = useGlobal("user");
  const form = useRef();

  const handleTab = () => {
    if (tab === "PREVIEW") setTab("FORM");
    else form.current.handleSubmit();
  };

  return (
    <Wrapper>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header-left">
            <CloseIcon onClick={() => closeModal()} />
            <h3>Upload Video</h3>
          </div>
          <div style={{ display: url ? "block" : "none" }}>
            <Button onClick={handleTab}>
              {tab === "PREVIEW" ? "Next" : "Upload"}
            </Button>
          </div>
        </div>

        {tab === "PREVIEW" && (
          <div className="tab video-preview">
            <Player
              previewUrl={previewVideo}
              video={{ src: "", isViewed: "", thumb: "" }}
            />
          </div>
        )}

        {tab === "FORM" && (
          <Formik
            innerRef={form}
            validateOnMount
            validationSchema={object({
              title: string().required("Title is required"),
              description: string(),
            })}
            initialValues={{ title: "", description: "" }}
            children={(props) => <VideoInfoForm {...props} />}
            onSubmit={(params) =>
              uploadVideoService({ ...params, url, thumbnail }).then(
                () =>
                  mutate(`/users/${user.id}`) |
                  mutate(`videos`) |
                  toast.dark("Upload successful") |
                  closeModal()
              )
            }
          />
        )}
      </div>
    </Wrapper>
  );
};

const VideoInfoForm = ({ values }) => {
  const { title, description } = values;

  return (
    <form className="tab video-form">
      <h2>Details</h2>
      <Field name="title" value={title} placeholder="Enter the title" />
      <Field
        name="description"
        value={description}
        component={Textarea}
        useComponent={false}
        placeholder="Tell viewers about your video"
      />
    </form>
  );
};
