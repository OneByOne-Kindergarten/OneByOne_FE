import { URL_PATHS } from "@/constants/url-path";

export type UrlKeys = keyof typeof URL_PATHS;

/**
 * 쿼리 제거 함수
 * @param path
 * @returns path without query
 */
export function getPathWithoutParams(path: string | null | undefined): string {
  // path가 문자열이 아닌 경우 빈 문자열 반환
  if (typeof path !== "string") {
    console.warn(
      "getPathWithoutParams에 문자열이 아닌 값이 전달되었습니다:",
      path
    );
    return "";
  }
  return path.split("?")[0];
}

/**
 * 쿼리 추출 함수
 * @param url URL 문자열 || URLSearchParams 객체
 * @returns object of query params
 */
export function getQueryParams(
  url: string | URLSearchParams
): Record<string, string> {
  // url이 유효하지 않은 경우
  if (typeof url !== "string" && !(url instanceof URLSearchParams)) {
    console.warn("getQueryParams에 유효하지 않은 값이 전달되었습니다:", url);
    return {};
  }

  const searchParams =
    typeof url === "string" ? new URLSearchParams(url.split("?")[1]) : url;

  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

/**
 * UrlKey 매칭 함수
 * @param path
 * @returns UrlKey || undefined
 */
export function getUrlKeyFromPath(
  path: string | null | undefined
): UrlKeys | undefined {
  // path가 문자열이 아닌 경우
  if (typeof path !== "string") {
    console.warn(
      "getUrlKeyFromPath에 문자열이 아닌 값이 전달되었습니다:",
      path
    );
    return undefined;
  }

  const pathWithoutParams = getPathWithoutParams(path);

  // 경로가 비어있는 경우
  if (!pathWithoutParams || pathWithoutParams === "/") {
    return "HOME";
  }

  const exactMatch = Object.entries(URL_PATHS).find(
    ([_, urlPath]) => getPathWithoutParams(urlPath) === pathWithoutParams
  );
  if (exactMatch) return exactMatch[0] as UrlKeys;

  // 동적 경로 파라미터 고려: 정확히 일치하지 않는 경우 패턴 매칭
  return Object.entries(URL_PATHS).find(([, urlPath]) => {
    if (typeof urlPath !== "string") return false;

    const pathPattern =
      urlPath.replace(/:[^/]+/g, "[^/]+").replace(/\//g, "\\/") + "$";
    const regex = new RegExp(pathPattern);
    return regex.test(pathWithoutParams);
  })?.[0] as UrlKeys | undefined;
}

/**
 * 구성 요소 분리 및 추출 함수
 * @param path
 * @returns array of segments
 */
export function getPathSegments(path: string | null | undefined): string[] {
  // path가 문자열이 아닌 경우 빈 배열 반환
  if (typeof path !== "string") {
    console.warn("getPathSegments에 문자열이 아닌 값이 전달되었습니다:", path);
    return [];
  }
  return path.split("/").filter((segment) => segment !== "");
}

/**
 * depth 계산 함수
 * @param path
 * @returns depth
 */
export function getPathDepth(path: string | null | undefined): number {
  return getPathSegments(path).length;
}

/**
 * 이동할 상위 경로 생성 함수
 * @param path
 * @param levels 상위로 이동할 레벨 수 (default: 1)
 * @returns path of parent
 */
export function getParentPath(
  path: string | null | undefined,
  levels: number = 1
): string {
  const segments = getPathSegments(path);
  if (segments.length <= levels) {
    return "/";
  }

  segments.splice(-levels);
  return "/" + segments.join("/");
}

/**
 * 쿼리를 포함한 경로 생성 함수
 * @param basePath
 * @param params
 * @returns url
 */
export function createUrlWithParams(
  basePath: string,
  params: Record<string, string>
): string {
  try {
    const url = new URL(basePath, window.location.origin);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    return url.pathname + url.search;
  } catch (error) {
    console.error("createUrlWithParams 오류:", error);
    return basePath;
  }
}
