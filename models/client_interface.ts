export interface Owner {
  _id: string;
  username: string;
  user_img: string;
}

export interface Post {
  _id: string;
  title: string;
  description: string;
  owner: Owner;
  sheets: string[];
  views: number;
  likes: string[];
  grade: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}