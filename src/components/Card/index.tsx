import { FC } from "react";
import "./card.css";
import UserActions, { UserActionsProps } from "../UserActions";
import { IComment, ICurrentUser } from "../../types";

const Card: FC<
  IComment & {
    currentUser: ICurrentUser;
    onStepperChange: (value: number) => void;
  } & Omit<UserActionsProps, "isCurrentUser">
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
          <UserActions {...userActionProps} isCurrentUser={isCurrentUser} />
        </div>
        <p>
          {!!replyingTo && <span className="replying-to">@{replyingTo}</span>}{" "}
          {content}
        </p>
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
        <UserActions {...userActionProps} isCurrentUser={isCurrentUser} />
      </div>
    </div>
  );
};

export default Card;
