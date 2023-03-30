import { FC } from "react";
import "./card.css";
import UserActions from "../UserActions";
import { IComment, ICurrentUser } from "../../types";

const Card: FC<IComment & { currentUser: ICurrentUser }> = ({
  content,
  createdAt,
  score,
  user,
  replyingTo,
  currentUser,
}) => {
  const isCurrentUser = currentUser?.username === user?.username;
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
          <UserActions isCurrentUser={isCurrentUser} />
        </div>
        <p>
          {!!replyingTo && <span className="replying-to">@{replyingTo}</span>}{" "}
          {content}
        </p>
      </div>
      <div className="card-actions">
        <div className="stepper">
          <button>
            <img src="/images/icon-plus.svg" alt="" />
          </button>
          <span>{score}</span>
          <button>
            <img src="/images/icon-plus.svg" alt="" />
          </button>
        </div>
        <UserActions isCurrentUser={isCurrentUser} />
      </div>
    </div>
  );
};

export default Card;
