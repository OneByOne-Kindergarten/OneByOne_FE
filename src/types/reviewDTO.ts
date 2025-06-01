export enum SortType {
  LATEST = "LATEST",
  POPULAR = "POPULAR",
}

export interface User {
  userId: number;
  nickname: string;
}

export interface WorkReview {
  workReviewId: number;
  user?: User;
  workYear: number;
  workType: string;
  oneLineComment: string;
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
  likeCount?: number;
  shareCount?: number;
  createdAt?: string;
}

export interface InternshipReview {
  internshipReviewId: number;
  user?: User;
  oneLineComment: string;
  instructionTeacherComment: string;
  instructionTeacherScore: number;
  learningSupportComment: string;
  learningSupportScore: number;
  workEnvironmentComment: string;
  workEnvironmentScore: number;
  workType: string;
  likeCount?: number;
  shareCount?: number;
  createdAt?: string;
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

export type WorkReviewResponse = ReviewResponse<WorkReview>;
export type InternshipReviewResponse = ReviewResponse<InternshipReview>;

export interface LikeResponse {
  success: boolean;
  message: string;
}
