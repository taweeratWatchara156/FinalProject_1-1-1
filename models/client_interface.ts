export interface Owner {
  _id: string;
  username: string;
  user_img: string;
}

export interface Post {
  _id: string;
  title: string;
  description: string;
  owner: Owner; // We'll assume you populated this
  sheets: string[];
  views: number;
  likes: string[]; // This is an array of IDs
  grade: string;
  category: string;
  createdAt: string; // We need this for sorting
  updatedAt: string;
}