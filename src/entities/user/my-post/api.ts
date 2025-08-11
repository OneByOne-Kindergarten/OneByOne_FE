import { MyPostParams, MyPostResponse } from "@/entities/user/my-post/DTO.d";
import { apiCall } from "@/shared/api/utils";
import { API_PATHS } from "@/shared/config/api";

// 근무 리뷰 조회
export const getMyWorkReviews = async (
  params: MyPostParams
): Promise<MyPostResponse> => {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    size: params.size.toString(),
  });

  try {
    return await apiCall<null, MyPostResponse>({
      method: "GET",
      path: `${API_PATHS.USER.MY_WORK_REVIEW}?${queryParams.toString()}`,
      withAuth: true,
      withCredentials: true,
    });
  } catch (error) {
    console.error("내가 작성한 근무 리뷰 조회 실패:", error);
    throw error;
  }
};

// 실습 리뷰 조회
export const getMyInternshipReviews = async (
  params: MyPostParams
): Promise<MyPostResponse> => {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    size: params.size.toString(),
  });

  try {
    return await apiCall<null, MyPostResponse>({
      method: "GET",
      path: `${API_PATHS.USER.MY_INTERNSHIP_REVIEW}?${queryParams.toString()}`,
      withAuth: true,
      withCredentials: true,
    });
  } catch (error) {
    console.error("내가 작성한 실습 리뷰 조회 실패:", error);
    throw error;
  }
};
