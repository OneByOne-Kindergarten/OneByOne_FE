import { Kindergarten } from "@/entities/kindergarten/DTO.d";

export const SCHOOL_STATS_COLORS = {
  AGE_3: "bg-star",
  AGE_4: "bg-green",
  AGE_5: "bg-tertiary-3",
} as const;

export const SCHOOL_STATS_AGES = [3, 4, 5] as const;

type StatsType = keyof typeof SCHOOL_STATS_COLORS;

export const calculateStats = (data: Kindergarten) => {
  const totalCount = data.totalClassCount;

  const stats = SCHOOL_STATS_AGES.map((age) => {
    const count = data[`classCount${age}` as keyof Kindergarten] as number;
    return {
      age,
      count,
      percent:
        totalCount > 0 ? `${Math.round((count / totalCount) * 100)}%` : "0%",
      color: SCHOOL_STATS_COLORS[`AGE_${age}` as StatsType],
    };
  });

  return stats;
};

export const calculateStudentStats = (data: Kindergarten) => {
  const totalCount = data.totalPupilCount;

  const stats = SCHOOL_STATS_AGES.map((age) => {
    const count = data[`pupilCount${age}` as keyof Kindergarten] as number;
    return {
      age,
      count,
      percent:
        totalCount > 0 ? `${Math.round((count / totalCount) * 100)}%` : "0%",
      color: SCHOOL_STATS_COLORS[`AGE_${age}` as StatsType],
    };
  });

  return stats;
};
