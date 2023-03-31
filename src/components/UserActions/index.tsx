import { FC, MouseEventHandler } from "react";
import "./userActions.css";

export type UserActionsProps = {
  isCurrentUser: boolean;
  onReply?: MouseEventHandler<HTMLButtonElement>;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  onEdit?: MouseEventHandler<HTMLButtonElement>;
};

const UserActions: FC<UserActionsProps> = ({
  isCurrentUser,
  onDelete,
  onEdit,
  onReply,
}) => {
  return (
    <div className="action-modify">
      {!isCurrentUser ? (
        <button className="action-btn edit" onClick={onReply}>
          <img src="./images/icon-reply.svg" alt="" />
          Reply
        </button>
      ) : (
        <>
          <button className="action-btn delete" onClick={onDelete}>
            <img src="./images/icon-delete.svg" alt="" />
            Delete
          </button>
          <button className="action-btn edit" onClick={onEdit}>
            <img src="./images/icon-edit.svg" alt="" />
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default UserActions;
