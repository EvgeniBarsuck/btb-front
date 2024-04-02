import { Typography, List } from "@mui/material";
import Cookies from "universal-cookie";
import { useState } from "react";

import { Comment } from "../../api/get-comments";
import { Comment as CommentComponent } from "../Comment/Comment";
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
        {!!props.comments.length
          ? props.comments.map((comment) => (
              <CommentComponent
                comment={comment}
                isAuthorized={isAuthorized}
                onCommentDelete={onCommentDelete}
                id={comment.id}
              ></CommentComponent>
            ))
          : null}
      </List>
    </>
  );
};
