export interface GeolocationState {
  loading: boolean;
  error: string | null;
  position: {
    latitude: number;
    longitude: number;
  } | null;
}

export interface CachedLocationData {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface LocationResponse {
  status: string;
  lat: string;
  long: string;
  message?: string;
  error?: string;
}

export interface LocationPosition {
  latitude: number;
  longitude: number;
}
