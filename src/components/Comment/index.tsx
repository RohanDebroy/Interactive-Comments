import { FC, useState } from "react";
import { IComment, ICurrentUser } from "../../types";
import Card from "../Card";
import Reply from "../Reply";
import "./comment.css";
import { useCommentContext } from "../../store";

type CommentProps = IComment & { currentUser: ICurrentUser };

const Comment: FC<CommentProps> = ({ replies, ...props }) => {
  const { dispatch } = useCommentContext();
  const [showReply, setShowReply] = useState(false);
  const [replyData, setReplyData] = useState<IComment>({
    content: "",
    createdAt: "",
    id: "",
    score: 0,
    user: {
      image: {
        png: "",
        webp: "",
      },
      username: "",
    },
    replyingTo: "",
  });

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Card
          onDelete={() => {
            dispatch({
              type: "DELETE",
              payload: {
                deleteId: props.id,
              },
            });
          }}
          onEdit={() => {}}
          onReply={() => {
            setShowReply(true);
            setReplyData((prev) => ({
              ...prev,
              user: props.currentUser,
              replyingTo: props.user.username,
            }));
          }}
          {...props}
        />
        {(showReply || (!!replies && !!replies.length)) && (
          <div className="replies-container">
            <hr />
            <div>
              {!!replies &&
                replies.map((reply) => (
                  <Card
                    key={reply.id}
                    currentUser={props.currentUser}
                    onReply={() => {
                      setShowReply(true);
                      setReplyData((prev) => ({
                        ...prev,
                        user: props.currentUser,
                        replyingTo: reply.user.username,
                      }));
                    }}
                    onDelete={() => {
                      dispatch({
                        type: "DELETE",
                        payload: {
                          deleteId: reply.id,
                          parentId: props.id,
                        },
                      });
                    }}
                    {...reply}
                  />
                ))}
              {showReply && (
                <Reply
                  onComment={(comment: string) => {
                    dispatch({
                      type: "REPLY",
                      payload: {
                        ...replyData,
                        replyingToId: props.id,
                        content: comment,
                      },
                    });
                    setShowReply(false);
                  }}
                  userProfile={props.currentUser.image.png}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
