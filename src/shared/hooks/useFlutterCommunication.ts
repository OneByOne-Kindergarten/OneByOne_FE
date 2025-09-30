import { useCallback, useState } from "react";

import {
  KakaoShareRequest,
  KakaoShareResult,
  MessageType,
  PermissionResult,
  PermissionType,
  requestKakaoShare,
  sendToFlutter,
} from "@/shared/utils/webViewCommunication";

/// Flutter InAppWebView 객체 존재 여부로 Flutter 환경 감지
/// TODO 0806 한승완 : 추후 userAgent 변환 확인 필요
export const isFlutterWebView =
  typeof window !== "undefined" && !!window.flutter_inappwebview;

/**
 * FCM 토큰을 직접 요청하는 훅
 * @returns [requestFcmToken, fcmToken, isLoading, error]
 *
 * @example
 * function NotificationComponent() {
 *   const [requestFcmToken, fcmToken, isLoading, error] = useRequestFcmToken();
 *
 *   useEffect(() => {
 *     // 컴포넌트 마운트 시 자동으로 FCM 토큰 요청
 *     requestFcmToken();
 *   }, []);
 *
 *   return (
 *     <div>
 *       {isLoading ? (
 *         <p>FCM 토큰 요청 중...</p>
 *       ) : fcmToken ? (
 *         <p>FCM 토큰: {fcmToken}</p>
 *       ) : (
 *         <button onClick={requestFcmToken}>FCM 토큰 요청</button>
 *       )}
 *       {error && <p className="text-red-500">에러: {error}</p>}
 *     </div>
 *   );
 * }
 */
export function useRequestFcmToken(): [
  () => Promise<string | null>,
  string | null,
  boolean,
  string | null,
] {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // FCM 토큰 요청 함수 - 직접 핸들러의 반환값 활용
  const requestFcmToken = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Flutter 핸들러에 FCM 토큰 요청 메시지 전송하고 즉시 결과 받기
      const result = await sendToFlutter<
        Record<string, never>,
        { status: string; token?: string; message?: string }
      >(MessageType.REQUEST_FCM_TOKEN, {});

      // 결과 처리
      if (result?.status === "success" && result.token) {
        setFcmToken(result.token);
        return result.token;
      } else {
        const errorMsg =
          result?.message || "FCM 토큰을 가져오는데 실패했습니다.";
        setError(errorMsg);
        return null;
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류";
      console.error("FCM 토큰 요청 오류:", error);
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [requestFcmToken, fcmToken, isLoading, error];
}

/**
 * 권한 요청 및 결과 처리를 위한 훅 (동기적 처리)
 * @returns [requestPermission, permissionGranted, isLoading, error]
 *
 * @example
 * function CameraComponent() {
 *   const [requestCameraPermission, isGranted, isLoading, error] = usePermission(PermissionType.CAMERA);
 *
 *   const handleTakePhoto = async () => {
 *     try {
 *       const granted = await requestCameraPermission();
 *
 *       if (granted) {
 *         // 카메라 기능 사용
 *       } else {
 *         alert('카메라 권한이 필요합니다.');
 *       }
 *     } catch (error) {
 *       console.error('권한 요청 실패:', error);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleTakePhoto} disabled={isLoading}>
 *         {isLoading ? '권한 요청 중...' : '사진 촬영'}
 *       </button>
 *       {error && <p className="text-red-500">에러: {error}</p>}
 *     </div>
 *   );
 * }
 */
export function usePermission(
  permissionType: PermissionType
): [() => Promise<boolean>, boolean | undefined, boolean, string | null] {
  const [permissionGranted, setPermissionGranted] = useState<
    boolean | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 권한 요청 함수 - 직접 핸들러의 반환값 활용
  const requestPermission = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // Flutter 핸들러에 권한 요청 메시지 전송하고 즉시 결과 받기
      const result = await sendToFlutter<
        { type: PermissionType },
        PermissionResult
      >(MessageType.REQUEST_PERMISSION, { type: permissionType });

      // 결과 처리
      const granted = result?.status === "success";
      setPermissionGranted(granted);

      if (!granted && result?.message) {
        setError(result.message);
      }

      return granted;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "알 수 없는 오류";
      console.error("권한 요청 오류:", error);
      setError(errorMessage);
      setPermissionGranted(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [permissionType]);

  return [requestPermission, permissionGranted, isLoading, error];
}

/**
 * 카카오 공유 기능을 위한 훅
 * @returns [shareToKakao, isSharing, shareError]
 *
 * @example
 * function PostComponent({ post }) {
 *   const [shareToKakao, isSharing, shareError] = useKakaoShare();
 *
 *   const handleShare = async () => {
 *     const result = await shareToKakao({
 *       title: post.title,
 *       url: `${window.location.origin}/community/${post.id}`,
 *       id: post.id.toString(),
 *       shareType: ShareType.COMMUNITY
 *     });
 *
 *     if (result.status === 'success') {
 *       // 공유 성공 처리
 *     } else {
 *       // 공유 실패 처리
 *     }
 *   };
 *
 *   return (
 *     <button onClick={handleShare} disabled={isSharing}>
 *       {isSharing ? '공유 중...' : '카카오톡 공유'}
 *     </button>
 *   );
 * }
 */

export function useKakaoShare(): [
  (shareData: KakaoShareRequest) => Promise<KakaoShareResult>,
  boolean,
  string | null,
] {
  const [isSharing, setIsSharing] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const shareToKakao = useCallback(
    async (shareData: KakaoShareRequest): Promise<KakaoShareResult> => {
      setIsSharing(true);
      setShareError(null);

      try {
        // 앱 환경인지 확인
        if (!isFlutterWebView) {
          console.warn("앱 환경이 아닙니다. 브라우저에서는 카카오 공유가 지원되지 않습니다.");
          console.log("공유 시도한 데이터:", shareData);
          return {
            status: "error",
            message: "앱 환경에서만 지원되는 기능입니다.",
          };
        }

        const result = await requestKakaoShare(shareData);

        if (result.status === "error") {
          setShareError(result.message);
        }

        return result;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류";
        console.error("카카오 공유 오류:", error);
        setShareError(errorMessage);
        return {
          status: "error",
          message: errorMessage,
        };
      } finally {
        setIsSharing(false);
      }
    },
    []
  );

  return [shareToKakao, isSharing, shareError];
}
