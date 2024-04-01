import { PostInRelation } from "./get-post";

export interface Blog {
  id: string;
  props: {
    longDescription: string;
    shortDescription: string;
    name: string;
    posts: PostInRelation[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export async function getBlog(id: string): Promise<Blog> {
  try {
    const response = await fetch(`http://localhost:3000/blogs/${id}`);
  
    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}
