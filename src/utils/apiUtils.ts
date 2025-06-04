import { getAuthHeaders, refreshAccessToken } from "@/services/authService";

const BASE_URL = import.meta.env.DEV
  ? "/api"
  : import.meta.env.REACT_APP_API_URL || "";

interface ApiCallOptions<T> {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string; // end point
  data?: T; // request body
  withAuth?: boolean; // auth header
  withCredentials?: boolean;
  isRetry?: boolean; // 토큰 갱신 후 재시도 여부
}

/**
 * apiCall 함수
 *
 * @template TRequest
 * @template TResponse
 * @param {ApiCallOptions<TRequest>} options
 * @returns {Promise<TResponse>}
 *
 * @example GET
 * const user = await apiCall<void, UserData>({
 *   method: "GET",
 *   path: "/users/123"
 * });
 *
 * @example POST
 * const newUser = await apiCall<CreateUserRequest, UserResponse>({
 *   method: "POST",
 *   path: "/users",
 *   data: { name: "John", email: "john@example.com" }
 * });
 *
 * @example 인증이 필요한 요청
 * const profile = await apiCall<void, UserProfile>({
 *   method: "GET",
 *   path: "/users/me",
 *   withAuth: true
 * });
 *
 * @throws {Error} 네트워크 오류 또는 API 응답 오류
 */

export async function apiCall<TRequest, TResponse>({
  method,
  path,
  data,
  withAuth = false,
  withCredentials = false,
  isRetry = false,
}: ApiCallOptions<TRequest>): Promise<TResponse> {
  const url = `${BASE_URL}${path}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(withAuth ? getAuthHeaders() : {}),
  };

  const options: RequestInit = {
    method,
    headers,
    ...(data ? { body: JSON.stringify(data) } : {}),
    ...(withCredentials ? { credentials: "include" } : {}),
  };

  const response = await fetch(url, options);

  // 401 에러 발생 시 토큰 갱신
  if (response.status === 401 && withAuth && !isRetry) {
    try {
      const refreshSuccess = await refreshAccessToken();

      // 토큰 갱신 성공 시 원래 요청 재시도
      if (refreshSuccess) {
        return await apiCall<TRequest, TResponse>({
          method,
          path,
          data,
          withAuth,
          withCredentials,
          isRetry: true,
        });
      }
    } catch (refreshError) {
      throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
    }
  }

  if (!response.ok) {
    let errorMessage = `${response.status} ${response.statusText}`;

    try {
      // 응답에 JSON 본문이 있는 경우 파싱
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        errorMessage = JSON.stringify({
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        });
      }
    } catch {
      // console.warn("Error response is not valid JSON:", jsonError);
    }

    throw new Error(errorMessage);
  }

  // 204
  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return {} as TResponse;
  }

  try {
    // JSON 응답 파싱 시도
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      // console.warn(`Response is not JSON: ${contentType}`);
      return {} as TResponse;
    }
  } catch {
    // console.error("Failed to parse JSON response:", jsonError);
    return {} as TResponse;
  }
}
