import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./CreatePost.css";
import { Formik } from "formik";

import { Blog } from "../../api/get-user-blogs";
import { UseCreatePostSubmitForm } from "./hooks/UseSubmit";

export const CreatePost = (props: { userBlogs: Blog[] }) => {
  const { customValidate, submitForm } = UseCreatePostSubmitForm();
  return (
    <div>
      <Formik
        initialValues={{
          shortDescription: "",
          content: "",
          name: "",
          blog: null,
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
            <Typography variant="h4">Create post</Typography>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="blog">Select blog</InputLabel>
              <Select
                name="blog"
                labelId="blog"
                id="blog"
                value={props.userBlogs[0]?.id}
                label="Select blog"
                onChange={handleChange}
              >
                {props.userBlogs.map((blog) => {
                  return (
                    <MenuItem value={blog.id} key={blog.id}>
                      {blog.props.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
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
              value={values.content}
              label="Content"
            />
            {errors.content && touched.content && errors.content}

            <Button
              sx={{
                marginTop: 1,
              }}
              variant="outlined"
              type="submit"
              disabled={isSubmitting}
            >
              Create Post
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
