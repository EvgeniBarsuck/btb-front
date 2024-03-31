import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./PostLists.css";
import { PostInRelation } from "../../api/get-post";
import { useEffect, useState } from "react";
import { getComments, Comment } from "../../api/get-comments";

export const PostsList = ({ posts }: { posts: PostInRelation[] }) => {
  const [comments, SetComments] = useState([] as Comment[]);
  const [post, SetPost] = useState();

  function onSelect(event) {
    SetPost(event.currentTarget.id);
  }

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ post:", post);
    if (post) {
      getComments(post).then((data) => { console.log(data); SetComments(data)});
    }
  }, [post]);

  return (
    <div className="post-list-content">
      <div className="post-list-item">
        {posts.map((post) => (
          <Accordion
            sx={{
              width: "100%",
            }}
            key={post.id}
            onClick={(event) => onSelect(event)}
            id={post.id}
          >
            <AccordionSummary aria-controls="panel1-content" id={post.id}>
              {post.name}
            </AccordionSummary>
            <AccordionDetails aria-controls="panel1-content">
              <Typography variant="subtitle1">
                {post.shortDescription}
              </Typography>
              <Typography variant="body1">{post.content}</Typography>
            </AccordionDetails>
            <div className="message-section">
              <Typography variant="overline">Comments</Typography>
              <List>
                {comments.length > 0
                  ? comments.map((comment) => (
                      <ListItem>
                        <ListItemText primary={comment.props.message} />
                      </ListItem>
                    ))
                  : null}
              </List>
            </div>

            <Divider variant="fullWidth" component="div" />
            <div className="message-section">
              <Typography variant="overline">Add comment</Typography>
              <div>
                <TextField variant="outlined"></TextField>
                <Button variant="text">Send</Button>
              </div>
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
