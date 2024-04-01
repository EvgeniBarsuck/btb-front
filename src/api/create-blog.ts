import axios from 'axios';

interface Props {
  name: string;
  shortDescription: string;
  longDescription: string;
}

export async function createBlog(
  props: Props,
  accessToken: string,
): Promise<{ id: string }> {
  try {
    const response = await axios.post(`http://localhost:3000/blog`, props, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
