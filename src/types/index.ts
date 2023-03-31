export interface IRoot {
  currentUser: ICurrentUser;
  comments: IComment[];
}

export interface ICurrentUser {
  image: IImage;
  username: string;
}

export interface IImage {
  png: string;
  webp: string;
}

export interface IComment {
  id: string;
  content: string;
  createdAt: string;
  score: number;
  user: IUser;
  replyingTo?: string;
  replies?: IComment[];
}

export interface IUser {
  image: IImage2;
  username: string;
}

export interface IImage2 {
  png: string;
  webp: string;
}

export interface IUser2 {
  image: IImage3;
  username: string;
}

export interface IImage3 {
  png: string;
  webp: string;
}
