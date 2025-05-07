export interface User {
  userId: number;
  nickname: string;
}

export interface Kindergarten {
  kindergartenId: number;
  name: string;
}

export interface WorkReview {
  workReviewId: number;
  user: User;
  kindergarten: Kindergarten;
  workYear: number;
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
  likeCount: number;
  shareCount: number;
}

export interface InternshipReview {
  internshipReviewId: number;
  user: User;
  kindergarten: Kindergarten;
  oneLineComment: string;
  workEnvironmentComment: string;
  workEnvironmentScore: number;
  learningSupportComment: string;
  learningSupportScore: number;
  instructionTeacherComment: string;
  instructionTeacherScore: number;
  likeCount: number;
  shareCount: number;
}

export interface ReviewResponse<T> {
  content: T[];
  totalPages: number;
}

export type WorkReviewResponse = ReviewResponse<WorkReview>;
export type InternshipReviewResponse = ReviewResponse<InternshipReview>;
