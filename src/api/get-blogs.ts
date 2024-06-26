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

export async function getBlogs(): Promise<Blog[]> {
  try {
    const response = await fetch('http://localhost:3000/blogs');

    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}
