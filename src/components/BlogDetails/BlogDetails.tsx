import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Blog, getBlog } from "../../api/get-blog";
import { Typography } from "@mui/material";
import { PostsList } from "../PostsList/PostsList";

import './BlogDetails.css';

export const BlogDetails = () => {
  const { data } = useQuery(["blog"], { enabled: false });
  const [blog, SetBlog] = useState<Blog>();

  useEffect(() => {
    getBlog(data).then((data) => SetBlog(data));
  }, [data]);

  console.log("🚀 ~ PostsList ~ blog:", blog?.props.posts);
  return (
    <div className="blog-content">
      <Typography variant="h5" gutterBottom>
        {blog?.props.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {blog?.props.shortDescription}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {blog?.props.longDescription}
      </Typography>
      { blog && blog?.props.posts.length > 0 ? <PostsList posts={blog?.props.posts}></PostsList>: null} 
    </div>
  );
};
