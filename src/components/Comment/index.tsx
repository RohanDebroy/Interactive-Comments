import { FC, useState } from "react";
import { IComment, ICurrentUser } from "../../types";
import Card from "../Card";
import Reply from "../Reply";
import "./comment.css";
import { useCommentContext } from "../../store";
import DeleteModal from "../DeleteModal";

type CommentProps = IComment & { currentUser: ICurrentUser };

const Comment: FC<CommentProps> = ({ replies, ...props }) => {
  const [show, setShow] = useState(false);
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
  const [deleteData, setDeleteData] = useState<any>({});

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Card
          onDelete={() => {
            setShow(true);
            setDeleteData({
              deleteId: props.id,
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
          onStepperChange={(value) => {
            dispatch({
              type: "STEPPER",
              payload: {
                id: props.id,
                score: value,
              },
            });
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
                    onStepperChange={(value) => {
                      dispatch({
                        type: "STEPPER",
                        payload: {
                          id: props.id,
                          score: value,
                          replyId: reply.id,
                        },
                      });
                    }}
                    onReply={() => {
                      setShowReply(true);
                      setReplyData((prev) => ({
                        ...prev,
                        user: props.currentUser,
                        replyingTo: reply.user.username,
                      }));
                    }}
                    onDelete={() => {
                      setShow(true);
                      setDeleteData({
                        deleteId: reply.id,
                        parentId: props.id,
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
      <DeleteModal
        show={show}
        setModal={(value) => {
          setDeleteData({});
          setShow(value);
        }}
        onDelete={() => {
          dispatch({
            type: "DELETE",
            payload: deleteData,
          });
        }}
      />
    </>
  );
};

export default Comment;
