import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Typography } from "@mui/material";

import { Blog, getBlog } from "../../api/get-blog";
import { PostsList } from "../PostsList/PostsList";

import './BlogDetails.css';

export const BlogDetails = () => {
  const { data } = useQuery(["blog"], { enabled: false });
  const [blog, SetBlog] = useState<Blog>();

  useEffect(() => {
    getBlog(data).then((data) => SetBlog(data));
  }, [data]);

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
      { blog?.props?.posts?.length && <PostsList posts={blog?.props.posts}></PostsList>} 
    </div>
  );
};
