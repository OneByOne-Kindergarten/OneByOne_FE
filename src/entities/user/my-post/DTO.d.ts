export interface MyPost {
  id: number;
  content: string;
  nickName: string;
  career: string;
  userRole: "TEACHER" | "STUDENT";
  createdAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  parentId: number;
  reply: boolean;
}

export interface MyPostResponse {
  content: MyPost[];
  totalPages: number;
}

export interface MyPostParams {
  page: number;
  size: number;
}
