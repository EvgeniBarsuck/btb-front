import axios from 'axios';

interface Props {
  name: string;
  shortDescription: string;
  longDescription: string;
  blogId: string;
  postId: string;
}

export async function updatePost(props: Props): Promise<{ id: string }> {
  try {
    const response = await axios.post(
      `http://localhost:3000/posts/${props.blogId}`,
      props,
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
}
