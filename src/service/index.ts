import allData from "../../db/data.json";
import type { IComment, ICurrentUser } from "../types";

const getComments = () => {
  return allData.comments as unknown as IComment[];
};

const getCurrentUser = () => {
  return allData.currentUser as unknown as ICurrentUser;
};

export default { getComments, getCurrentUser };
