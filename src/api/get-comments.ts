export interface Comment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  props: {
    message: string;
  };
}

export async function getComments(postId: string): Promise<Comment[]> {
  try {
    const response = await fetch(`http://localhost:3000/comments/${postId}`);

    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}
