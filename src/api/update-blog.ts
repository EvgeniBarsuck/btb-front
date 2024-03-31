import axios from "axios";

interface Props {
  name: string;
  shortDescription: string;
  longDescription: string;
  blogId: string;
}

export async function updateBlog(props: Props): Promise<{ id: string }> {
  try {
    const response = await axios.post(`http://localhost:3000/blogs/${props.blogId}`, props);

    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}
