export interface User {
  id: number;
  nickName: string;
  email?: string;
  career?: string; // viene del archivo
}

export interface Tag {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  description: string;
  userId: number;
  tags: Tag[];
  images?: string[];
  commentCount: number;
  user?: User;
  createdAt: string;
  likes?: number;
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
  userId: number;
  user?: User;
  visible: boolean;
}
