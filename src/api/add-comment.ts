import axios from "axios";

interface Props {
    message: string;
}

export async function addComment(props: Props, accessToken: string): Promise<{ id: string }> {
  try {
    const response = await axios.post(`http://localhost:3000/comments`, props, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
