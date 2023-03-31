import { FC } from "react";
import { IComment } from "../../types";
import "./comments.css";
import Comment from "../Comment";
import Reply from "../Reply";
import { useCommentContext } from "../../store";

const Comments: FC<{ comments: IComment[] }> = ({ comments }) => {
  const {
    state: { currentUser },
    dispatch,
  } = useCommentContext();

  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment.id} currentUser={currentUser} {...comment} />
      ))}
      <Reply
        onComment={(comment: string) => {
          dispatch({
            type: "CREATE",
            payload: {
              content: comment,
            },
          });
        }}
        userProfile={currentUser.image.png}
      />
    </>
  );
};

export default Comments;
