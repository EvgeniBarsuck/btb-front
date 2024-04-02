import { Formik } from "formik";
import { Button, Link, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { UseLoginSubmitForm } from "./hooks/UseSubmit";

import "./login.css";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { customValidate, submitForm } = UseLoginSubmitForm(navigate);

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={customValidate}
        onSubmit={(val, { setSubmitting }) => submitForm(val, setSubmitting)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="login-form" onSubmit={handleSubmit}>
            <TextField
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              label="email"
              sx={{
                margin: 1,
              }}
            />
            {errors.email && touched.email && errors.email}

            <TextField
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              label="password"
              sx={{
                margin: 1,
              }}
            />
            {errors.password && touched.password && errors.password}
            <Button
              sx={{
                marginTop: 1,
              }}
              variant="outlined"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </Button>
            <div className="regirect-section">
              <p>Don't have account</p> <Link href="/register">Register</Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
