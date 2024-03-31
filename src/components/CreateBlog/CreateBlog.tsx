import { Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import Cookies from "universal-cookie";
import { createBlog } from "../../api/create-blog";
import "./CreateBlog.css";

export const CreateBlog = () => {
  return (
    <div>
      <Formik
        initialValues={{
          shortDescription: "",
          longDescription: "",
          name: "",
        }}
        validate={(values) => {
          const errors: { name?: string, longDescription?: string, shortDescription?: string } = {};

          if (!values.name) {
            errors.name = "Required";
          }

          if (!values.longDescription) {
            errors.longDescription = "Required";
          }

          if (!values.shortDescription) {
            errors.longDescription = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);

          const cookie = new Cookies();

          await createBlog(
            {
              longDescription: values.longDescription,
              name: values.name,
              shortDescription: values.shortDescription,
            },
            cookie.get("accessToken")
          );

          setSubmitting(false);
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
          <form className="create-post" onSubmit={handleSubmit}>
            <Typography variant="h4">Create blog</Typography>
            <TextField
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              label="Name"
            />
            {errors.name && touched.name && errors.name}

            <TextField
              name="shortDescription"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.shortDescription}
              label="Short description"
            />
            {errors.shortDescription &&
              touched.shortDescription &&
              errors.shortDescription}

            <TextField
              name="content"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.longDescription}
              label="Long description"
            />
            {errors.longDescription &&
              touched.longDescription &&
              errors.longDescription}

            <Button
              sx={{
                marginTop: 1,
              }}
              variant="outlined"
              type="submit"
              disabled={isSubmitting}
            >
              Create blog
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
