export enum SortType {
  LATEST = "LATEST",
  POPULAR = "POPULAR",
}

export interface User {
  userId: number;
  nickname: string;
}

// 공통 리뷰 베이스 인터페이스
interface BaseReview {
  user?: User;
  kindergartenId: number;
  kindergartenName: string;
  oneLineComment: string;
  workType: string;
  likeCount?: number;
  shareCount?: number;
  createdAt?: string;
}

export interface WorkReview extends BaseReview {
  workReviewId: number;
  workYear: number;
  benefitAndSalaryComment: string;
  benefitAndSalaryScore: number;
  workLifeBalanceComment: string;
  workLifeBalanceScore: number;
  workEnvironmentComment: string;
  workEnvironmentScore: number;
  managerComment: string;
  managerScore: number;
  customerComment: string;
  customerScore: number;
}

export interface InternshipReview extends BaseReview {
  internshipReviewId: number;
  instructionTeacherComment: string;
  instructionTeacherScore: number;
  learningSupportComment: string;
  learningSupportScore: number;
  workEnvironmentComment: string;
  workEnvironmentScore: number;
}

export type CreateInternshipReviewRequest = Omit<
  InternshipReview,
  "internshipReviewId" | "user" | "likeCount" | "shareCount" | "createdAt"
> & {
  kindergartenId: number;
  workType: string;
};

export type CreateWorkReviewRequest = Omit<
  WorkReview,
  "workReviewId" | "user" | "likeCount" | "shareCount" | "createdAt"
> & {
  kindergartenId: number;
};

export interface ReviewResponse<T> {
  content: T[];
  totalPages: number;
}

export interface PaginatedReviewResponse<T> {
  content: T[];
  totalPages: number;
}

export interface ReviewQueryParams {
  page?: number;
  size?: number;
  sortType?: SortType;
}

export type WorkReviewResponse = ReviewResponse<WorkReview>;
export type InternshipReviewResponse = ReviewResponse<InternshipReview>;

export interface LikeResponse {
  success: boolean;
  message: string;
}
