import { Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";

import { UseCreateBlogForm } from "./hooks/UseSubmit";

import "./CreateBlog.css";

export const CreateBlog = () => {
  const { customValidate, submitForm } = UseCreateBlogForm();
  return (
    <div>
      <Formik
        initialValues={{
          shortDescription: "",
          longDescription: "",
          name: "",
        }}
        validate={customValidate}
        onSubmit={(values, { setSubmitting }) =>
          submitForm(values, setSubmitting)
        }
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
