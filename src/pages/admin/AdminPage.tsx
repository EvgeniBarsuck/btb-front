import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Blog } from "../../api/get-blogs";
import { getUserBlogs } from "../../api/get-user-blogs";
import { CreateBlog } from "../../components/CreateBlog/CreateBlog";
import { CreatePost } from "../../components/CreatePost/CreatePost";
import "./AdminPage.css";

export const AdminPage = () => {
  const [userBlogs, SetUserBlogs] = useState([] as Blog[]);
  const cookies = new Cookies();

  useEffect(() => {
    getUserBlogs(cookies.get("accessToken")).then((data) => SetUserBlogs(data));
  }, []);

  return (
    <div>
      <div className="admin-page-create">
        <CreateBlog></CreateBlog>
        {userBlogs ? <CreatePost userBlogs={userBlogs}></CreatePost> : null}
      </div>
    </div>
  );
};
