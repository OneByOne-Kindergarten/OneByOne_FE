export interface Category {
  id: string;
  categoryName: string;
  description: string;
  createdAt: string;
  isActive: boolean;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  categoryId: string;
  useId: string;
  views: number;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  communityType?: "teacher" | "pre-teacher";
}

export interface Like {
  id: string;
  postId: string;
  useId: string;
  createdAt: string;
}

export interface User {
  id: string;
  nickname: string;
  email: string;
  password: string;
  profileImageUrl: string;
  createdAt: string;
  deletedAt: string;
  role: string; // 교사 인증된 유저 또는 미인증 유저
}

export interface Comment {
  id: string;
  postId?: string;
  useId?: string;
  author: string;
  content: string;
  createdAt: string;
  likeCount: number;
  replies?: Comment[];
}
