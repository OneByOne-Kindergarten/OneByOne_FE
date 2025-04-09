import { apiCall } from "@/utils/apiUtils";
import { API_PATHS } from "@/constants/api-path";
import {
  KindergartenDetailResponse,
  NearbyKindergartensParams,
  NearbyKindergartensResponse,
  KindergartenSearchParams,
  KindergartenSearchResponse,
} from "@/types/kindergartenDTO";

/**
 * 유치원 상세 정보 조회
 * @param id
 * @returns 유치원 상세 정보
 */

export const getKindergartenDetail = async (
  id: number
): Promise<KindergartenDetailResponse> => {
  try {
    return await apiCall<void, KindergartenDetailResponse>({
      method: "GET",
      path: API_PATHS.KINDERGARTEN.DETAIL(id),
      withAuth: true,
      withCredentials: true,
    });
  } catch (error) {
    console.error("유치원 상세 정보 조회 에러:", error);
    throw error;
  }
};

/**
 * 주변 유치원 목록 조회
 * @param params latitude, longitude, radiusKm
 * @returns 주변 유치원 목록
 */

export const getNearbyKindergartens = async (
  params: NearbyKindergartensParams
): Promise<NearbyKindergartensResponse> => {
  try {
    const { latitude, longitude, radiusKm } = params;

    const queryParams = new URLSearchParams();
    queryParams.append("latitude", latitude.toString());
    queryParams.append("longitude", longitude.toString());

    if (radiusKm) {
      queryParams.append("radiusKm", radiusKm.toString());
    }

    return await apiCall<void, NearbyKindergartensResponse>({
      method: "GET",
      path: `${API_PATHS.KINDERGARTEN.NEARBY}?${queryParams.toString()}`,
      withAuth: true,
      withCredentials: true,
    });
  } catch (error) {
    console.error("주변 유치원 목록 조회 에러:", error);
    throw error;
  }
};

/**
 * 유치원 검색
 * @param params search options, page, size, sort
 * @returns 페이지네이션된 유치원 목록
 */

export const searchKindergartens = async (
  params: KindergartenSearchParams
): Promise<KindergartenSearchResponse> => {
  try {
    const { page = 0, size = 10, sort, ...searchCriteria } = params;

    const queryParams = new URLSearchParams();

    // search
    Object.entries(searchCriteria).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value.toString());
      }
    });

    // page, size
    queryParams.append("page", page.toString());
    queryParams.append("size", size.toString());

    // sort
    if (sort && sort.length > 0) {
      sort.forEach((sortItem) => {
        queryParams.append("sort", sortItem);
      });
    }

    console.log(
      `유치원 검색 API 요청: ${API_PATHS.KINDERGARTEN.SEARCH}?${queryParams.toString()}`
    );
    console.log("검색 파라미터:", JSON.stringify(params, null, 2));

    const response = await apiCall<void, KindergartenSearchResponse>({
      method: "GET",
      path: `${API_PATHS.KINDERGARTEN.SEARCH}?${queryParams.toString()}`,
      withAuth: true,
      withCredentials: true,
    });

    console.log("유치원 검색 API 응답:", JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.error("유치원 검색 에러:", error);
    throw error;
  }
};
