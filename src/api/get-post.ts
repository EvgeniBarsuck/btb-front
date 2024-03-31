export interface Post {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  props: {
    content: string;
    shortDescription: string;
    name: string;
    comments: Comment[];
  };
}

export interface PostInRelation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  shortDescription: string;
  name: string;
  comments: CommentInRelation[];
}

export interface CommentInRelation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  message: string;
}

export async function getPost(postId: string) {
  const response = await fetch(`http://localhost:3000/posts${postId}`);

  return response.json();
}
