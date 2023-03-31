import { FC } from "react";
import "./reply.css";

export type ReplyProps = {
  onComment: (comment: string) => void;
  userProfile: string;
};

const Reply: FC<ReplyProps> = ({ onComment, userProfile }) => {
  return (
    <form
      className="reply-comp-container"
      onSubmit={(e) => {
        e.preventDefault();
        const comment = e.currentTarget["comment"].value;
        onComment?.(comment);
        e.currentTarget.reset();
      }}
    >
      <img src={userProfile} alt="" />
      <textarea
        aria-label="enter comment"
        placeholder="Add a comment..."
        name="comment"
        id=""
        rows={4}
      />
      <button type="submit">SEND</button>
    </form>
  );
};

export default Reply;
