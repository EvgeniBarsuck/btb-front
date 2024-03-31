import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { getBlogs, Blog } from "../../api/get-blogs";
import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";

import "./BlogsList.css";

export default function BlogsList() {
  const queryClient = useQueryClient();
  const [blogs, setBlogs] = React.useState([] as Blog[]);

  React.useEffect(() => {
    getBlogs().then((data) => {
      console.log(data);
      setBlogs(data);
    });
  }, []);

  function onBlogSeletect(event: Event) {
    mutation.mutate({ id: event.target.value })
  }

  const mutation = useMutation({
    mutationFn: (res: { id: string}) => {
      return res
    },
    onSuccess: (res) => {
      queryClient.setQueryData(['blog'], res.id)
    }
  });

  return (
    <List sx={{ width: "100%", maxWidth: 1000, bgcolor: "background.paper" }}>
      {blogs.map((blog) => {
        return (
          <>
            <ListItem alignItems="flex-start" className="read-more" key={blog.id}>
              <ListItemText
                key={blog.id}
                primary={blog.props.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {blog.props.longDescription}
                    </Typography>
                    {` ${blog.props.longDescription.slice(0, 50)}...`}
                  </React.Fragment>
                }
              />
              <div className="read-more">
                <Button
                  value={blog.id}
                  onClick={(event) => {
                    onBlogSeletect(event)
                  }}
                >
                  Read more
                </Button>
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
  );
}
