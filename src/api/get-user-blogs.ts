import axios from "axios";

export interface Blog {
  id: string;
  props: {
    longDescription: string;
    shortDescription: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export async function getUserBlogs(accessToken: string): Promise<Blog[]> {
  const response = await axios.get("http://localhost:3000/blogs/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}
