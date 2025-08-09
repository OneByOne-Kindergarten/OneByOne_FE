export const SCHOOL_STATS_COLORS = {
  AGE_3: "bg-star",
  AGE_4: "bg-green",
  AGE_5: "bg-tertiary-3",
} as const;

export const SCHOOL_STATS_AGES = [3, 4, 5] as const;

export const SCHOOL_DEFAULT_NAME = "유치원";

export const SCHOOL_QUERY_CONFIG = {
  staleTime: 1000 * 60 * 5, // 5분
  gcTime: 1000 * 60 * 30, // 30분
  refetchOnWindowFocus: false,
} as const;
