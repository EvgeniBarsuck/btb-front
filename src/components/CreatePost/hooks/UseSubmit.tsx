import Cookies from "universal-cookie";

import { createPost } from "../../../api/create-post";

export const useSubmit = async <T extends { [key: string]: string }>(
  values: T,
  { setSubmitting }
) => {
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
};
