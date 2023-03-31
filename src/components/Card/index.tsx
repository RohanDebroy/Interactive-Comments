import { FC, useState } from "react";
import "./card.css";
import UserActions, { UserActionsProps } from "../UserActions";
import { IComment, ICurrentUser } from "../../types";

const Card: FC<
  IComment & {
    currentUser: ICurrentUser;
    onStepperChange: (value: number) => void;
    onUpdate: (update: string) => void;
  } & Omit<UserActionsProps, "isCurrentUser" | "onEdit">
> = ({
  content,
  createdAt,
  score,
  user,
  replyingTo,
  currentUser,
  replies,
  id,
  onStepperChange,
  onUpdate,
  ...userActionProps
}) => {
  const isCurrentUser = currentUser?.username === user?.username;
  const handleStepper = (decrement?: boolean) => {
    let newValue = 0;
    if (decrement) {
      newValue = score - 1;
    } else {
      newValue = score + 1;
    }
    onStepperChange?.(newValue);
  };

  const [showEdit, setShowEdit] = useState(false);
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-header">
          <img
            className="profile-pic"
            src={user.image.png}
            alt={`Profile pic of ${user.username}`}
          />
          <span className="username">{user.username}</span>
          {isCurrentUser && <span className="current-user">you</span>}
          <span className="createdAt">{createdAt}</span>
          <UserActions
            {...userActionProps}
            onEdit={() => setShowEdit((prev) => !prev)}
            isCurrentUser={isCurrentUser}
          />
        </div>
        {!showEdit ? (
          <p>
            {!!replyingTo && <span className="replying-to">@{replyingTo}</span>}{" "}
            {content}
          </p>
        ) : (
          <EditComment
            setShowEdit={setShowEdit}
            defaultValue={content}
            onUpdate={onUpdate}
          />
        )}
      </div>
      <div className="card-actions">
        <div className="stepper">
          <button onClick={() => handleStepper(true)}>
            <img src="/images/icon-minus.svg" alt="" />
          </button>
          <span>{score}</span>
          <button onClick={() => handleStepper()}>
            <img src="/images/icon-plus.svg" alt="" />
          </button>
        </div>
        <UserActions
          {...userActionProps}
          onEdit={() => setShowEdit((prev) => !prev)}
          isCurrentUser={isCurrentUser}
        />
      </div>
    </div>
  );
};

export default Card;

function EditComment({
  defaultValue,
  onUpdate,
  setShowEdit,
}: {
  defaultValue: string;
  onUpdate: (update: string) => void;
  setShowEdit: (value: boolean) => void;
}) {
  return (
    <form
      className="edit-comment"
      onSubmit={(e) => {
        e.preventDefault();
        const comment = e.currentTarget["comment"].value;
        onUpdate?.(comment);
        e.currentTarget.reset();
        setShowEdit(false);
      }}
    >
      <textarea
        aria-label="enter comment"
        placeholder="Add a comment..."
        name="comment"
        id=""
        rows={4}
        defaultValue={defaultValue}
      />
      <button className="reply-btn" type="submit">
        Update
      </button>
    </form>
  );
}
