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

export interface CommunityPostParams {
  title?: string;
  content?: string;
  category: "TEACHER" | "PROSPECTIVE_TEACHER";
  categoryName?: string;
  userName?: string;
  page?: number;
  size?: number;
  sort?: string[];
}

// 개별 게시글
export interface CommunityPostItem {
  id: number;
  title: string;
  content: string;
  category: "TEACHER" | "PROSPECTIVE_TEACHER";
  categoryName: string;
  userNickname: string;
  categoryDescription: string;
  userRole: "TEACHER" | "PROSPECTIVE_TEACHER" | "ADMIN";
  userEmail: string;
  career: string | null;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

// 게시글 목록
export interface CommunityPostData {
  content: CommunityPostItem[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

export interface CreateCommunityPostRequest {
  title: string;
  content: string;
  category: "TEACHER" | "PROSPECTIVE_TEACHER";
  communityCategoryName: string;
  communityCategoryDescription: string;
}

export interface CreateCommunityPostResponse {
  success: boolean;
  data: CommunityPostItem;
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
  data: CommunityPostItem;
  message: string;
}

// 인기 게시글 TOP 10
export interface PopularPostsResponse {
  success: boolean;
  data: CommunityPostItem[];
  message: string;
}

export type UserRole = "TEACHER" | "PROSPECTIVE_TEACHER" | "ADMIN";
export type CommentStatus = "PENDING" | "PROCESSED" | "REJECTED" | "YET";

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
