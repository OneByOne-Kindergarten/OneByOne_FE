const LAST_VISITED_PATHS_KEY = "lastVisitedPaths";

interface LastVisitedPaths {
  community: {
    path: string;
    category?: "teacher" | "pre-teacher";
    communityCategoryName?: string;
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
    path: "/community?type=teacher&communityCategoryName=top10",
    category: "teacher",
    communityCategoryName: "top10",
  },
};

// 마지막 방문 경로 설정
export function getLastVisitedPaths(): LastVisitedPaths {
  try {
    const savedState = sessionStorage.getItem(LAST_VISITED_PATHS_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);

      // 커뮤니티 객체 정리
      if (parsedState.community) {
        const community = parsedState.community;

        if (community.type && !community.category) {
          community.category = community.type;
          delete community.type;
        }

        if (community.type && community.category) {
          delete community.type;
        }

        if (
          community.category &&
          typeof community.category === "string" &&
          community.category !== "teacher" &&
          community.category !== "pre-teacher"
        ) {
          if (!community.communityCategoryName) {
            community.communityCategoryName = community.category;
          }
          community.category = "teacher"; // 기본값
        }
      }

      return parsedState;
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
  const state = getState(key) as { path?: string };
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

export function getCommunityCategory(): "TEACHER" | "PROSPECTIVE_TEACHER" {
  const category = getCommunityState().category;

  if (category === "teacher") return "TEACHER";
  if (category === "pre-teacher") return "PROSPECTIVE_TEACHER";

  return "TEACHER";
}

export function setCommunityCategory(
  category: "TEACHER" | "PROSPECTIVE_TEACHER"
): void {
  const lowerCategory = category === "TEACHER" ? "teacher" : "pre-teacher";
  setCommunityState({ category: lowerCategory });
}

export function getCommunityCategoryName(): string {
  return getCommunityState().communityCategoryName || "";
}

export function setCommunityCategoryName(communityCategoryName: string): void {
  setCommunityState({ communityCategoryName });
}

export function getCommunityType(): "teacher" | "pre-teacher" {
  const category = getCommunityState().category;
  return category || "teacher";
}

export function setCommunityType(type: "teacher" | "pre-teacher"): void {
  setCommunityState({ category: type });
}

export function getCategoryType(): string {
  return getCommunityCategoryName();
}

export function setCategoryType(category: string): void {
  setCommunityCategoryName(category);
}

// 리뷰 경로 상태
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

// 유치원 경로 상태
export function getSchoolState(): LastVisitedPaths["school"] {
  return getState("school");
}

export function setSchoolState(
  state: Partial<NonNullable<LastVisitedPaths["school"]>>
): void {
  setState("school", state);
}

export function getSchoolPath(): string {
  return getPath("school");
}

export function setSchoolPath(path: string): void {
  setPath("school", path);
}

/**
 * school 탭 클릭 시 이동할 경로 반환
 * - school 페이지를 마지막에 방문했으면 school 경로 우선
 * - review 페이지를 마지막에 방문했으면 review 경로 반환
 */
export function getSchoolTabPath(): string {
  const schoolState = getSchoolState();
  const reviewState = getReviewState();

  // school 경로가 있고, review 경로에 "/review"가 포함되어 있지 않으면 school 우선
  if (schoolState?.path && !schoolState.path.includes("/review")) {
    return schoolState.path;
  }

  // review 경로가 있으면 review 반환
  if (reviewState?.path) {
    return reviewState.path;
  }

  // school 경로가 있으면 반환 (review 포함)
  if (schoolState?.path) {
    return schoolState.path;
  }

  // 둘 다 없으면 기본 경로
  return "/school";
}
