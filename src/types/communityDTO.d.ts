export interface User {
  id: string;
  nickname: string;
  email: string;
  password: string;
  profileImageUrl: string;
  createdAt: string;
  deletedAt: string;
  role: string;
}

// 게시글
export interface CreateCommunityPostRequest {
  title: string;
  content: string;
  category: "TEACHER" | "PRE_TEACHER";
  communityCategoryName: string;
  communityCategoryDescription: string;
}

export interface CommunityPostData {
  id: number;
  title: string;
  content: string;
  category: "TEACHER" | "PRE_TEACHER";
  categoryName: string;
  categoryDescription: string;
  userName: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommunityPostResponse {
  success: boolean;
  data: CommunityPostData;
  message: string;
}

// 게시글 좋아요 토글
export interface LikeStatusRequest {
  postId: number;
}

export interface LikeStatusData {
  liked: boolean;
  likeCount: number;
}

export interface LikeStatusResponse {
  success: boolean;
  data: LikeStatusData;
  message: string;
}

// 게시글 상세
export interface CommunityPostDetailRequest {
  id: number;
}

export interface CommunityPostDetailResponse {
  success: boolean;
  data: CommunityPostData;
  message: string;
}

// 인기 게시글 TOP 10
export interface PopularPostsResponse {
  success: boolean;
  data: CommunityPostData[];
  message: string;
}

// 댓글 관련 타입
export type UserRole = "TEACHER" | "PRE_TEACHER" | "ADMIN" | "USER";
export type CommentStatus = "PENDING" | "APPROVED" | "REJECTED";

// 댓글 목록 조회
export interface CommentListParams {
  postId: number;
  page?: number;
  size?: number;
  sort?: string[];
}

export interface CommentItem {
  id: number;
  content: string;
  nickName: string;
  career: string;
  userRole: UserRole;
  createdAt: string;
  status: CommentStatus;
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
}

export interface CreateCommentResponse {
  success: boolean;
  data: CommentItem;
  message: string;
}
