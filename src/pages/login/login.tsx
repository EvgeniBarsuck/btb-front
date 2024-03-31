import { login as loginRequest } from "../../api/login";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import "./login.css";
import { Button, Link, TextField } from "@mui/material";
import Cookies from "universal-cookie";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: { email?: string, password?: string } = {};

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Required";
          }

          return errors;
        }}
        onSubmit={async(values, { setSubmitting }) => {
          setSubmitting(true);

          const cookies = new Cookies();

          const result = await loginRequest(values.email, values.password);

          cookies.set('accessToken', result.accessToken);

          setSubmitting(false);

          navigate('/admin');
        }}
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
