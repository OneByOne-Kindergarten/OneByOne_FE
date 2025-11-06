import { apiCall } from "@/shared/api/utils";
import { API_PATHS } from "@/shared/config/api";
import type { LearningReviewFormValues } from "@/widgets/review-editor/ui/LearningReviewForm";
import type { WorkReviewFormValues } from "@/widgets/review-editor/ui/WorkReviewForm";

import { SortType } from "./DTO.d";

import type {
  InternshipReview,
  InternshipReviewResponse,
  LikeResponse,
  PaginatedReviewResponse,
  ReviewQueryParams,
  WorkReview,
  WorkReviewResponse,
} from "./DTO.d";

// ------------------------------------------------------------------------------

export const getWorkReviews = async (
  kindergartenId: number,
  sortType?: SortType
) => {
  const queryParams = sortType ? `?sortType=${sortType}` : "";
  return apiCall<null, WorkReviewResponse>({
    method: "GET",
    path: API_PATHS.WORK.GET(kindergartenId) + queryParams,
    withAuth: true,
  });
};

export const getInternshipReviews = async (
  kindergartenId: number,
  sortType?: SortType
) => {
  const queryParams = sortType ? `?sortType=${sortType}` : "";
  return apiCall<null, InternshipReviewResponse>({
    method: "GET",
    path: API_PATHS.INTERNSHIP.GET(kindergartenId) + queryParams,
    withAuth: true,
  });
};

export const getAllWorkReviews = async (
  params: ReviewQueryParams = {}
): Promise<PaginatedReviewResponse<WorkReview>> => {
  const { page = 0, size = 10, sortType = SortType.LATEST } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sortType: sortType.toString(),
  });

  return apiCall<null, PaginatedReviewResponse<WorkReview>>({
    method: "GET",
    path: `${API_PATHS.WORK.GET_ALL}?${queryParams.toString()}`,
    withAuth: true,
  });
};

export const getAllInternshipReviews = async (
  params: ReviewQueryParams = {}
): Promise<PaginatedReviewResponse<InternshipReview>> => {
  const { page = 0, size = 10, sortType = SortType.LATEST } = params;

  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sortType: sortType.toString(),
  });

  return apiCall<null, PaginatedReviewResponse<InternshipReview>>({
    method: "GET",
    path: `${API_PATHS.INTERNSHIP.GET_ALL}?${queryParams.toString()}`,
    withAuth: true,
  });
};

// ------------------------------------------------------------------------------

export const createInternshipReview = async (
  data: LearningReviewFormValues & { kindergartenId: number; workType: string }
): Promise<LikeResponse> => {
  return apiCall<
    LearningReviewFormValues & { kindergartenId: number; workType: string },
    LikeResponse
  >({
    method: "POST",
    path: API_PATHS.INTERNSHIP.BASE,
    data,
    withAuth: true,
  });
};

export const createWorkReview = async (
  data: WorkReviewFormValues & { kindergartenId: number }
): Promise<LikeResponse> => {
  return apiCall<
    WorkReviewFormValues & { kindergartenId: number },
    LikeResponse
  >({
    method: "POST",
    path: API_PATHS.WORK.BASE,
    data,
    withAuth: true,
  });
};

// ------------------------------------------------------------------------------

export const likeWorkReview = async (workReviewId: number) => {
  return apiCall<null, LikeResponse>({
    method: "POST",
    path: API_PATHS.WORK.LIKE(workReviewId),
    withAuth: true,
  });
};

export const likeInternshipReview = async (internshipReviewId: number) => {
  return apiCall<null, LikeResponse>({
    method: "POST",
    path: API_PATHS.INTERNSHIP.LIKE(internshipReviewId),
    withAuth: true,
  });
};

// ------------------------------------------------------------------------------

export const updateWorkReview = async (
  workReviewId: number,
  data: WorkReviewFormValues & { kindergartenId: number }
): Promise<LikeResponse> => {
  return apiCall<
    WorkReviewFormValues & { kindergartenId: number; workReviewId: number },
    LikeResponse
  >({
    method: "PUT",
    path: API_PATHS.WORK.BASE,
    data: {
      ...data,
      workReviewId,
    },
    withAuth: true,
  });
};

export const updateInternshipReview = async (
  internshipReviewId: number,
  data: LearningReviewFormValues & { kindergartenId: number; workType: string }
): Promise<LikeResponse> => {
  return apiCall<
    LearningReviewFormValues & {
      kindergartenId: number;
      workType: string;
      internshipReviewId: number;
    },
    LikeResponse
  >({
    method: "PUT",
    path: API_PATHS.INTERNSHIP.BASE,
    data: {
      ...data,
      internshipReviewId,
    },
    withAuth: true,
  });
};

// ------------------------------------------------------------------------------

export const deleteWorkReview = async (
  workReviewId: number
): Promise<LikeResponse> => {
  return apiCall<null, LikeResponse>({
    method: "DELETE",
    path: API_PATHS.WORK.DELETE(workReviewId),
    withAuth: true,
  });
};

export const deleteInternshipReview = async (
  internshipReviewId: number
): Promise<LikeResponse> => {
  return apiCall<null, LikeResponse>({
    method: "DELETE",
    path: API_PATHS.INTERNSHIP.DELETE(internshipReviewId),
    withAuth: true,
  });
};
