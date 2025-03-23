const LAST_VISITED_PATHS_KEY = "lastVisitedPaths";

// 마지막 방문 경로
interface LastVisitedPaths {
  community: {
    path: string;
    type: "teacher" | "pre-teacher";
    category: string;
  };
  school?: {
    path: string;
  };
  review?: {
    path: string;
    type: "work" | "learning";
  };
}

const DEFAULT_LAST_VISITED_PATHS: LastVisitedPaths = {
  community: {
    path: "/community?type=teacher&category=top10",
    type: "teacher",
    category: "top10",
  },
};

/**
 * 마지막 방문 경로 상태를 세션 스토리지에서 가져옵니다.
 */
export function getLastVisitedPaths(): LastVisitedPaths {
  try {
    const savedState = sessionStorage.getItem(LAST_VISITED_PATHS_KEY);
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error("세션 스토리지 접근 오류:", error);
  }
  return DEFAULT_LAST_VISITED_PATHS;
}

/**
 * 마지막 방문 경로 상태를 세션 스토리지에 저장합니다.
 */
export function setLastVisitedPaths(state: Partial<LastVisitedPaths>): void {
  try {
    const currentState = getLastVisitedPaths();
    const newState = { ...currentState, ...state };
    sessionStorage.setItem(LAST_VISITED_PATHS_KEY, JSON.stringify(newState));
  } catch (error) {
    console.error("세션 스토리지 저장 오류:", error);
  }
}

/**
 * 커뮤니티 상태 전체를 설정합니다.
 */
export function setCommunityState(
  state: Partial<LastVisitedPaths["community"]>
): void {
  const currentState = getLastVisitedPaths();
  setLastVisitedPaths({
    community: {
      ...currentState.community,
      ...state,
    },
  });
}

/**
 * 커뮤니티 상태 전체를 가져옵니다.
 */
export function getCommunityState(): LastVisitedPaths["community"] {
  return getLastVisitedPaths().community;
}

/**
 * 커뮤니티 마지막 방문 경로를 설정합니다.
 */
export function setCommunityPath(path: string): void {
  setCommunityState({ path });
}

/**
 * 커뮤니티 마지막 방문 경로를 가져옵니다.
 */
export function getCommunityPath(): string {
  return getCommunityState().path;
}

/**
 * 커뮤니티 타입을 설정합니다.
 */
export function setCommunityType(type: "teacher" | "pre-teacher"): void {
  setCommunityState({ type });
}

/**
 * 커뮤니티 타입을 가져옵니다.
 */
export function getCommunityType(): "teacher" | "pre-teacher" {
  return getCommunityState().type;
}

/**
 * 카테고리 타입을 설정합니다.
 */
export function setCategoryType(category: string): void {
  setCommunityState({ category });
}

/**
 * 카테고리 타입을 가져옵니다.
 */
export function getCategoryType(): string {
  return getCommunityState().category;
}

/**
 * 리뷰 상태 전체를 설정합니다.
 */
export function setReviewState(
  state: Partial<LastVisitedPaths["review"]>
): void {
  const currentState = getLastVisitedPaths();
  const currentReviewState = currentState.review || { path: "" };

  setLastVisitedPaths({
    review: {
      ...currentReviewState,
      ...state,
    },
  });
}

/**
 * 리뷰 상태 전체를 가져옵니다.
 */
export function getReviewState(): LastVisitedPaths["review"] {
  const state = getLastVisitedPaths();
  return state.review || { path: "" };
}

/**
 * 리뷰 마지막 방문 경로를 설정합니다.
 */
export function setReviewPath(path: string): void {
  setReviewState({ path });
}

/**
 * 리뷰 마지막 방문 경로를 가져옵니다.
 */
export function getReviewPath(): string {
  const reviewState = getReviewState();
  return reviewState?.path || "";
}
