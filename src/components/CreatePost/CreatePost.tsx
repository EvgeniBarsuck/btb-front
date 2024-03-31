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
import { createPost } from "../../api/create-post";
import Cookies from "universal-cookie";

export const CreatePost = (props: { userBlogs: Blog[] }) => {
  return (
    <div>
      <Formik
        initialValues={{
          shortDescription: "",
          content: "",
          name: "",
          blog: null,
        }}
        validate={(values) => {
          const errors: {
            name?: string;
            content?: string;
            shortDescription?: string;
          } = {};

          if (!values.name) {
            errors.name = "Required";
          }

          if (!values.content) {
            errors.content = "Required";
          }

          if (!values.shortDescription) {
            errors.shortDescription = "Required";
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);

          const cookie = new Cookies();

          await createPost(
            {
              content: values.content,
              blogId: values.blog,
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
