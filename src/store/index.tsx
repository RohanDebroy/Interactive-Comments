import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { IRoot } from "../types";
import data from "../../db/data.json";

const initialState = {
  comments: [],
  currentUser: { image: { png: "", webp: "" }, username: "" },
};

const reducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case "STEPPER":
      let temp5 = (state as IRoot).comments;
      const { id, score, replyId } = payload;
      if (replyId) {
        temp5.forEach((comment) => {
          if (comment.replies) {
            comment.replies.forEach((reply) => {
              if (reply.id !== replyId) return;
              reply.score = score;
            });
          }
        });
      } else {
        temp5 = temp5.map((comment) => {
          if (comment.id !== id) return comment;
          const newData = { ...comment, score: score };
          return newData;
        });
      }

      return { ...state, comments: temp5 };
    case "CREATE":
      const temp = (state as IRoot).comments;
      temp.push({
        id: crypto.randomUUID(),
        content: payload.content,
        createdAt: Date.now().toString(),
        score: 0,
        user: (state as IRoot).currentUser,
      });
      return { ...state, comments: temp };
    case "Edit":
      console.log(payload);
      return state;
    case "DELETE":
      let temp3 = (state as IRoot).comments;
      const { deleteId, parentId } = payload;
      if (deleteId && parentId) {
        temp3.forEach((comment) => {
          if (parentId && comment.replies) {
            if (comment.id !== parentId) return;
            comment.replies = comment.replies.filter(
              (reply) => reply.id !== deleteId
            );
            return;
          }
        });
      } else {
        temp3 = temp3.filter((temp) => temp.id !== deleteId);
      }
      return { ...state, comments: temp3 };
    case "REPLY":
      const temp2 = (state as IRoot).comments;
      const { replyingToId, ...rest } = payload;
      temp2.forEach((comment) => {
        if (comment.id !== replyingToId) return;
        if (comment.replies === undefined) comment.replies = [];
        comment.replies.push({
          ...rest,
          id: crypto.randomUUID(),
          createdAt: Date.now().toString(),
        });
      });
      return { ...state, comments: temp2 };
    default:
      return state;
  }
};

export const CommentContext = createContext<{ state: IRoot; dispatch: any }>({
  state: initialState,
  dispatch: () => {},
});

const CommentContextProvider: FC<{ children: ReactNode }> = (props) => {
  const [store, dispatch] = useReducer(reducer, initialState, () => {
    const localData = localStorage.getItem("store");
    return localData ? JSON.parse(localData) : data;
  });

  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(store));
  }, [store]);

  return (
    <CommentContext.Provider value={{ state: store, dispatch }}>
      {props.children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (context === undefined) throw new Error("Define context");
  return context;
};

export default CommentContextProvider;
