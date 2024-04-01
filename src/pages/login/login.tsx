import { Formik } from "formik";
import { Button, Link, TextField } from "@mui/material";

import { customValidate } from "../../helpers/validate";
import { useSubmit } from "./hooks/UseSubmit";

import "./login.css";

export const LoginPage = () => {

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const validateResult = customValidate(values);

          if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            validateResult.email = "Invalid email address";
          }

          return validateResult;
        }}
        onSubmit={useSubmit}
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
              <p>Don't have account</p> <Link href="/">Register</Link>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
