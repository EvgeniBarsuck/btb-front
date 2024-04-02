import { useQuery } from "react-query";
import BlogsList from "../../components/BlogsList/BlogsList";
import { BlogDetails } from "../../components/BlogDetails/BlogDetails";
import { useEffect } from "react";
import './Blogs.css';

export const BlogsPage = () => {
  const { data } = useQuery(["blog"], { enabled: false });

  useEffect(() => {
    console.log("🚀 ~ BlogsPage ~ query:", data);
  }, [data]);

  return (
    <div className="content">
      <BlogsList></BlogsList>
      { data ? <BlogDetails></BlogDetails> : null} 
    </div>
  );
};
