import { useQuery } from "@tanstack/react-query";

import { getNearbyKindergartens } from "../api";
import { Kindergarten } from "../DTO.d";

interface UseNearbyKindergartensOptions {
  latitude: number | null;
  longitude: number | null;
}

interface UseNearbyKindergartensReturn {
  kindergartens: Kindergarten[];
  isLoading: boolean;
  error: string | null;
}

export function useNearbyKindergartens({
  latitude,
  longitude,
}: UseNearbyKindergartensOptions): UseNearbyKindergartensReturn {
  const {
    data: nearbyKindergartensResponse,
    isLoading: isLoadingKindergartens,
    error: kindergartensError,
  } = useQuery({
    queryKey: ["kindergartens", latitude, longitude],
    queryFn: () =>
      getNearbyKindergartens({
        latitude: latitude!,
        longitude: longitude!,
      }),
    enabled: Boolean(latitude && longitude),
    staleTime: 1000 * 60 * 60, // 1시간
    gcTime: 1000 * 60 * 120, // 2시간
  });

  const kindergartens =
    nearbyKindergartensResponse?.success && nearbyKindergartensResponse?.data
      ? nearbyKindergartensResponse.data
      : [];

  const error =
    (kindergartensError instanceof Error ? kindergartensError.message : null) ||
    (nearbyKindergartensResponse && !nearbyKindergartensResponse.success
      ? nearbyKindergartensResponse.message
      : null);

  return {
    kindergartens,
    isLoading: isLoadingKindergartens,
    error,
  };
}
