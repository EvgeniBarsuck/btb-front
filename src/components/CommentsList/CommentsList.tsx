import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import Cookies from "universal-cookie";
import { useState } from "react";

import { Comment } from "../../api/get-comments";
import { deleteComment } from "../../api/delete-comment";

export const CommentsList = (props: { comments: Comment[] }) => {
  const [isAuthorized, SetIsAuthorized] = useState(true);

  const cookie = new Cookies();

  async function onCommentDelete(id: string) {
    const token = cookie.get("accessToken");

    if (!token) {
      SetIsAuthorized(false);

      return;
    }

    SetIsAuthorized(true);

    await deleteComment({ id }, token);
  }

  return (
    <>
      <Typography variant="overline">Comments</Typography>
      <List>
        {props.comments.length > 0
          ? props.comments.map((comment) => (
              <ListItem
                sx={{
                  width: "500px",
                  justifyContent: "flex-end",
                }}
              >
                <ListItemText primary={comment.props.message} />
                <Button onClick={() => onCommentDelete(comment.id)}>Delete</Button>
                {!isAuthorized && (
                  <Typography variant="body2" color="red">
                    User must be authorized
                  </Typography>
                )}
              </ListItem>
            ))
          : null}
      </List>
    </>
  );
};
