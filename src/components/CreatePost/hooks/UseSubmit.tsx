import Cookies from "universal-cookie";

import { createPost } from "../../../api/create-post";

export const UseCreatePostSubmitForm = () => {
  async function submitForm<T extends { [key: string]: string }>(
    values: T,
    setSubmitting
  ) {
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
