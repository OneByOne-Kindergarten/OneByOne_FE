import { useAtom } from "jotai";
import { ReactNode, useEffect } from "react";
import { useKakaoLoader } from "react-kakao-maps-sdk";

import {
  kakaoMapErrorAtom,
  kakaoMapSDKLoadedAtom,
} from "@/entities/kindergarten/model";
import MapError from "@/features/kindergarten/MapError";

const apiKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

interface KakaoMapWrapperProps {
  children: ReactNode;
  height?: string;
}

/**
 * 카카오맵 SDK를 관리하는 컴포넌트
 */
export default function KakaoMapWrapper({
  children,
  height = "h-80",
}: KakaoMapWrapperProps) {
  const [, setIsSDKLoaded] = useAtom(kakaoMapSDKLoadedAtom);
  const [error, setError] = useAtom(kakaoMapErrorAtom);

  const [, loadError] = useKakaoLoader({
    appkey: apiKey || "",
    libraries: [],
  });

  // SDK 로딩 상태를 전역 atom에 동기화
  useEffect(() => {
    if (loadError) {
      setError(loadError);
      setIsSDKLoaded(false);
    } else {
      setIsSDKLoaded(true);
      setError(undefined);
    }
  }, [loadError, setIsSDKLoaded, setError]);

  if (error) {
    return <MapError height={height} error={error} />;
  }

  return <div className={`${height} relative w-full`}>{children}</div>;
}
