const LAST_VISITED_PATHS_KEY = "lastVisitedPaths";

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

type PathKey = keyof LastVisitedPaths;

const DEFAULT_LAST_VISITED_PATHS: LastVisitedPaths = {
  community: {
    path: "/community?type=teacher&category=top10",
    type: "teacher",
    category: "top10",
  },
};

// 마지막 방문 경로 설정
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

export function setLastVisitedPaths(state: Partial<LastVisitedPaths>): void {
  try {
    const currentState = getLastVisitedPaths();
    const newState = { ...currentState, ...state };
    sessionStorage.setItem(LAST_VISITED_PATHS_KEY, JSON.stringify(newState));
  } catch (error) {
    console.error("세션 스토리지 저장 오류:", error);
  }
}

// 공통 함수: 특정 경로 키 설정 및 부분 업데이트
export function getState<K extends PathKey>(key: K): LastVisitedPaths[K] {
  const state = getLastVisitedPaths();
  return state[key] || ({} as LastVisitedPaths[K]);
}

export function setState<K extends PathKey>(
  key: K,
  value: Partial<LastVisitedPaths[K]>
): void {
  const currentState = getLastVisitedPaths();
  const currentKeyState = currentState[key] || {};

  setLastVisitedPaths({
    [key]: {
      ...currentKeyState,
      ...value,
    },
  } as Partial<LastVisitedPaths>);
}

// 공통 함수: 특정 경로 설정 및 조회
export function setPath<K extends PathKey>(key: K, path: string): void {
  setState(key, { path } as unknown as Partial<LastVisitedPaths[K]>);
}

export function getPath<K extends PathKey>(key: K): string {
  const state = getState(key) as any;
  return state?.path || "";
}

// 커뮤니티 경로 상태
export function getCommunityState(): LastVisitedPaths["community"] {
  return getState("community");
}

export function setCommunityState(
  state: Partial<LastVisitedPaths["community"]>
): void {
  setState("community", state);
}

export function getCommunityPath(): string {
  return getPath("community");
}

export function setCommunityPath(path: string): void {
  setPath("community", path);
}

export function getCommunityType(): "teacher" | "pre-teacher" {
  return getCommunityState().type;
}

export function setCommunityType(type: "teacher" | "pre-teacher"): void {
  setCommunityState({ type });
}

export function getCategoryType(): string {
  return getCommunityState().category;
}

export function setCategoryType(category: string): void {
  setCommunityState({ category });
}

// 커뮤니티 경로 상태
export function getReviewState(): LastVisitedPaths["review"] {
  return getState("review");
}

export function setReviewState(
  state: Partial<NonNullable<LastVisitedPaths["review"]>>
): void {
  setState("review", state);
}

export function getReviewPath(): string {
  return getPath("review");
}

export function setReviewPath(path: string): void {
  setPath("review", path);
}
