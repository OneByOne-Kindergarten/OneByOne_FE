import { apiCall } from "@/utils/apiUtils";
import { API_PATHS } from "@/constants/api-path";
import { MyPostResponse, MyPostParams } from "@/types/myPostDTO";

export const getMyPosts = async (
  params: MyPostParams
): Promise<MyPostResponse> => {
  const queryParams = new URLSearchParams({
    page: params.page.toString(),
    size: params.size.toString(),
  });

  try {
    return await apiCall<null, MyPostResponse>({
      method: "GET",
      path: `${API_PATHS.USER.MY_POST}?${queryParams.toString()}`,
      withAuth: true,
      withCredentials: true,
    });
  } catch (error) {
    console.error("내가 작성한 게시물 조회 실패:", error);
    throw error;
  }
};
