import axios from 'axios';

interface Props {
  id: string;
}

export async function deleteComment(
  props: Props,
  accessToken: string,
): Promise<{ id: string }> {
  try {
    const response = await axios.delete(
      `http://localhost:3000/comments/${props.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
