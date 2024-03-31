import axios from "axios";

interface Props {
  name: string;
  shortDescription: string;
  content: string;
  blogId: string;
}

export async function createPost(props: Props, accessToken: string): Promise<{ id: string }> {
  try {
    const response = await axios.post(`http://localhost:3000/post`, props, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (e: any) {
    throw new Error(e);
  }
}
