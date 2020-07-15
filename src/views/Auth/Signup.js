import React, { useDispatch } from "reactn";
import { object, ref, string } from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";

import { meService, signupService } from "services/authService";
import { namedRoutes } from "Router";
import Button from "components/Button";
import Field from "components/Field";

export default function Signup({ history }) {
  const login = useDispatch("auth.login");

  return (
    <>
      <h2>Create your account</h2>
      <Formik
        validateOnMount
        initialValues={{
          confirm_password: "",
          firstname: "",
          lastname: "",
          username: "",
          password: "",
          email: "",
        }}
        validationSchema={object({
          email: string().email().required("Email is required"),
          lastname: string().required("Last name is required"),
          username: string().min(3).required("Username is required"),
          password: string().min(6).required("Password is required"),
          firstname: string().required("First name is required"),
          confirm_password: string()
            .oneOf([ref("password"), null], "Passwords must match")
            .required("Confirm password"),
        })}
        children={(props) => <SignUpForm {...props} {...{ history }} />}
        onSubmit={(params, { setSubmitting }) =>
          signupService(params)
            .then(({ data }) => {
              localStorage["access_token"] = data;

              meService().then(({ data }) => {
                login(data);
                history.push(namedRoutes.home);
              });
            })
            .catch((error) =>
              toast.error(
                error?.response?.data?.message || "Unable to sign up user"
              )
            )
            .finally(() => setSubmitting(false))
        }
      />
    </>
  );
}

export function SignUpForm({
  handleSubmit,
  isSubmitting,
  isValid,
  values,
  history,
}) {
  const {
    confirm_password,
    firstname,
    lastname,
    username,
    password,
    email,
  } = values;
  return (
    <form>
      <div className="input-group">
        <Field name="firstname" value={firstname} placeholder="First Name" />
        <Field name="lastname" placeholder="Last Name" value={lastname} />
      </div>
      <div className="input-group">
        <Field name="username" placeholder="Username" value={username} />
      </div>
      <div className="input-group">
        <Field name="email" type="email" placeholder="Email" value={email} />
      </div>
      <div className="input-group">
        <Field
          name="password"
          type="password"
          placeholder="Password"
          value={password}
        />
        <Field
          type="password"
          name="confirm_password"
          placeholder="Confirm Passowrd"
          value={confirm_password}
        />
      </div>
      <div className="action input-group">
        <span
          className="pointer"
          onClick={() => history.push(namedRoutes.auth.login)}
        >
          Sign in instead
        </span>
        <Button
          {...{ isSubmitting, handleSubmit, isValid, value: "Sign Up" }}
        />
      </div>
    </form>
  );
}
