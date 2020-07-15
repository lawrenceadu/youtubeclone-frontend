import React, { useGlobal, useRef, useState } from "reactn";
import { object, string } from "yup";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { Img } from "react-image";

import { addCommentService } from "services/videoService";
import { timesince } from "utils";
import Textarea from "components/Textarea";
import Wrapper from "../Styles/CommentWrapper";
import Field from "components/Field";
import Button from "components/Button";

export default ({ video, videoMutate: mutate }) => {
  /**
   * variables
   */
  const { id, comments } = video;
  const width = window.innerWidth <= 930;
  const content = useRef(null);

  /**
   * state
   */
  const [user] = useGlobal("user");
  const [toggle, setToggle] = useState(false);

  return (
    <Wrapper>
      <div className="heading" onClick={() => width && setToggle(!toggle)}>
        <h3>{comments?.length} comments</h3>

        <i className="material-icons">
          {toggle ? "expand_less" : "expand_more"}
        </i>
      </div>

      <div
        ref={content}
        style={{
          ...(toggle && content && { height: content?.current?.scrollHeight }),
        }}
        className={`content ${toggle ? "active" : ""}`}
      >
        <Formik
          validateOnMount
          validationSchema={object({
            comment: string().required("Comment is required"),
          })}
          initialValues={{ comment: "" }}
          children={({
            values: { comment },
            setFieldTouched,
            setFieldValue,
            handleSubmit,
            isSubmitting,
            isValid,
            touched,
            ...props
          }) => (
            <form className="add-comment">
              <div className="d-flex" style={{ width: "100%" }}>
                <Img
                  src={user?.avatar || "https://via.placeholder.com/150"}
                  alt="avatar"
                />
                <Field
                  onFocus={() => setFieldTouched("comment", true)}
                  placeholder="Add a public comment"
                  useComponent={false}
                  component={Textarea}
                  value={comment}
                  name="comment"
                  error={false}
                  as="textarea"
                />
              </div>
              {touched?.comment && (
                <div className="action">
                  <span
                    className="pointer"
                    onClick={() =>
                      setFieldValue("comment", "") |
                      setFieldTouched("comment", false)
                    }
                  >
                    Cancel
                  </span>
                  <Button
                    {...{
                      handleSubmit,
                      isValid,
                      isSubmitting,
                      value: "Comment",
                    }}
                  />
                </div>
              )}
            </form>
          )}
          onSubmit={(
            { comment },
            { setSubmitting, setFieldValue, setFieldTouched }
          ) =>
            addCommentService(id, { text: comment })
              .then(
                () =>
                  mutate(
                    {
                      ...video,
                      comments: [
                        {
                          User: user,
                          createdAt: new Date().toISOString(),
                          text: comment,
                        },
                        ...comments,
                      ],
                    },
                    false
                  ) |
                  setFieldValue("comment", "") |
                  setFieldTouched("comment", false)
              )
              .finally(() => setSubmitting(false))
          }
        />

        {comments &&
          comments.map((comment, key) => (
            <div key={key} className="comment">
              <Link to={`/channel/${comment.User?.id}`}>
                <Img src={comment.User?.avatar} alt="avatar" />
              </Link>
              <div className="comment-info">
                <p className="secondary">
                  <span>
                    <Link to={`/channel/${comment.User?.id}`}>
                      {comment.User?.username}
                    </Link>
                  </span>
                  <span style={{ marginLeft: "0.6rem" }}>
                    {timesince(comment.createdAt)} ago
                  </span>
                </p>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
      </div>
    </Wrapper>
  );
};
