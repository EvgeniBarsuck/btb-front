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
import Cookies from "universal-cookie";
import { addComment } from "../../api/add-comment";
import { deleteComment } from "../../api/delete-comment";

export const PostsList = ({ posts }: { posts: PostInRelation[] }) => {
  const [comments, SetComments] = useState([] as Comment[]);
  const [post, SetPost] = useState();
  const [newComment, ChangeNewComment] = useState("");
  const [isAuthorized, SetIsAuthorized] = useState(true);
  const cookie = new Cookies();

  function onSelect(event) {
    SetPost(event.currentTarget.id);
  }

  function onCommentChange(event) {
    ChangeNewComment(event.target.value);
  }

  async function onCommentSend() {
    const token = cookie.get("accessToken");

    if (!token) {
      SetIsAuthorized(false);

      return;
    }

    SetIsAuthorized(true);

    await addComment(
      {
        message: newComment,
        postId: post
      },
      token
    );
  }

  async function onCommentDelete(id: string) {
    const token = cookie.get("accessToken");

    if (!token) {
      SetIsAuthorized(false);

      return;
    }

    SetIsAuthorized(true);

    await deleteComment({ id, }, token);
  }

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ post:", post);
    if (post) {
      getComments(post).then((data) => {
        console.log(data);
        SetComments(data);
      });
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
                      <ListItem sx={{
                        width: '500px',
                        justifyContent: 'flex-end'
                      }}>
                        <input hidden value={comment.id}></input>
                        <ListItemText primary={comment.props.message} />
                        <Button onClick={() => onCommentDelete(comment.id)}>Delete</Button>
                      </ListItem>
                    ))
                  : null}
              </List>
            </div>

            <Divider variant="fullWidth" component="div" />
            <div className="message-section">
              <Typography variant="overline">Add comment</Typography>
              <div>
                <TextField
                  variant="outlined"
                  value={newComment}
                  onChange={onCommentChange}
                ></TextField>
                <Button variant="text" onClick={onCommentSend}>
                  Send
                </Button>
                {!isAuthorized ? (
                  <Typography variant="body2" color="red">
                    User must be authorized
                  </Typography>
                ) : null}
              </div>
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};
