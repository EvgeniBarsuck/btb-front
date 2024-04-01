import Cookies from "universal-cookie";

import { createBlog } from "../../../api/create-blog";

export const useSubmit = async <T extends { [key: string]: string }>(
  values: T,
  { setSubmitting }
) => {
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
};
