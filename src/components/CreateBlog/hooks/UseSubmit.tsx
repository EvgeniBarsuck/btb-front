import Cookies from "universal-cookie";

import { createBlog } from "../../../api/create-blog";

export const UseCreateBlogForm = () => {
  async function submitForm<T extends { [key: string]: string }>(
    values: T,
    setSubmitting
  ) {
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
  }

  function customValidate<T extends { [key: string]: string }>(
    props: T
  ): Partial<T> {
    const errors: any = {};

    for (const field in props) {
      if (!field) {
        errors.field = "Required";
      }
    }

    return errors;
  }

  return { submitForm, customValidate };
};
