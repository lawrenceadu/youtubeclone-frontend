import React, { useDispatch } from "reactn";
import { object, string } from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";

import { loginService, meService } from "services/authService";
import { namedRoutes } from "Router";
import Button from "components/Button";
import Field from "components/Field";

export default ({ history }) => {
  const login = useDispatch("auth.login");

  return (
    <>
      <h2>Login to your account</h2>
      <Formik
        validateOnMount
        initialValues={{ email: "", password: "" }}
        validationSchema={object({
          email: string().email().required("Email is required"),
          password: string().required("Password is required"),
        })}
        children={(props) => <LoginForm {...props} {...{ history }} />}
        onSubmit={(params, { setSubmitting }) =>
          loginService(params)
            .then(({ data }) => {
              localStorage["access_token"] = data;

              meService().then(({ data }) => {
                login(data);
                history.push(namedRoutes.home);
              });
            })
            .catch((error) =>
              toast.error(error?.response?.data?.message || "Account not found")
            )
            .finally(() => setSubmitting(false))
        }
      />
    </>
  );
};

export function LoginForm({
  handleSubmit,
  isSubmitting,
  isValid,
  values,
  history,
}) {
  const { email, password } = values;
  return (
    <form>
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
      </div>
      <div className="action input-group">
        <span
          className="pointer"
          onClick={() => history.push(namedRoutes.auth.signup)}
        >
          Signup instead
        </span>
        <Button {...{ isSubmitting, handleSubmit, isValid, value: "Login" }} />
      </div>
    </form>
  );
}
