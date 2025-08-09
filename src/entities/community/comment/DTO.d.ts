// 댓글 목록
export interface CommentListParams {
  postId: number;
  page?: number;
  size?: number;
  sort?: string[];
}

// 개별 댓글 정보
export interface CommentItem {
  career: string | null;
  id: number;
  content: string;
  email: string;
  nickName: string;
  userRole: UserRole;
  createdAt: string;
  status: CommentStatus;
  parentId?: number | null;
  reply: boolean;
}

export interface PageInfo {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface CommentListResponse extends PageInfo {
  content: CommentItem[];
}

// 댓글 작성
export interface CreateCommentRequest {
  postId: number;
  content: string;
  parentId?: number;
}

export interface CreateCommentResponse {
  success: boolean;
  data: CommentItem;
  message: string;
}
