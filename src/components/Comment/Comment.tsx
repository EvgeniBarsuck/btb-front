import { ListItem, ListItemText, Button, Typography } from "@mui/material";
import { useCallback } from "react";
import { Comment as IComment } from "../../api/get-comments";

export const Comment = (props: {
  comment: IComment;
  isAuthorized: boolean;
  onCommentDelete;
  id: string;
}) => {
  const { comment, id, isAuthorized, onCommentDelete } = props;
  const handleCommentDelete = useCallback(
    () => onCommentDelete(id),
    [onCommentDelete, id]
  );

  return (
    <ListItem
      sx={{
        width: "500px",
        justifyContent: "flex-end",
      }}
    >
      <ListItemText primary={comment.props.message} />
      <Button onClick={handleCommentDelete}>Delete</Button>
      {!isAuthorized && (
        <Typography variant="body2" color="red">
          User must be authorized
        </Typography>
      )}
    </ListItem>
  );
};
