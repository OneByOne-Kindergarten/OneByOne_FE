import {
  usePermission,
  useRequestFcmToken,
} from "@/hooks/useFlutterCommunication";
import { PermissionType } from "@/utils/webViewCommunication";

export default function PermissionExample() {
  // FCM 토큰 훅사용
  const [requestFcmToken, fcmToken, fcmTokenLoading] = useRequestFcmToken();

  // 위치 권한 훅 사용
  const [
    requestLocationPermission,
    locationGranted,
    locationLoading,
    locationError,
  ] = usePermission(PermissionType.LOCATION);

  // 저장소 권한 훅 사용
  const [
    requestStoragePermission,
    storageGranted,
    storageLoading,
    storageError,
  ] = usePermission(PermissionType.STORAGE);

  // 알림 권한 훅 사용
  const [
    requestNotificationPermission,
    notificationGranted,
    notificationLoading,
    notificationError,
  ] = usePermission(PermissionType.NOTIFICATION);

  // FCM 토큰 요청 핸들러
  const handleRequestFcmToken = async () => {
    try {
      const token = await requestFcmToken();
      console.log("FCM 토큰 요청 결과:", token);
    } catch (error) {
      console.error("FCM 토큰 요청 실패:", error);
    }
  };

  // 권한 요청 핸들러 - 위치
  const handleRequestLocationPermission = async () => {
    try {
      const result = await requestLocationPermission();
      console.log("위치 권한 요청 결과:", result);
    } catch (error) {
      console.error("위치 권한 요청 실패:", error);
    }
  };

  // 권한 요청 핸들러 - 저장소
  const handleRequestStoragePermission = async () => {
    try {
      const result = await requestStoragePermission();
      console.log("저장소 권한 요청 결과:", result);
    } catch (error) {
      console.error("저장소 권한 요청 실패:", error);
    }
  };

  // 권한 요청 핸들러 - 알림
  const handleRequestNotificationPermission = async () => {
    try {
      const result = await requestNotificationPermission();
      console.log("알림 권한 요청 결과:", result);
    } catch (error) {
      console.error("알림 권한 요청 실패:", error);
    }
  };

  // 권한 상태 표시 함수
  const renderPermissionStatus = (
    granted: boolean | undefined,
    loading: boolean,
    error: string | null
  ) => {
    if (loading) return <span className="text-blue-500">권한 요청 중...</span>;
    if (error) return <span className="text-red-500">오류: {error}</span>;
    if (granted === undefined)
      return <span className="text-gray-500">아직 요청되지 않음</span>;
    return granted ? (
      <span className="text-green-500">허용됨</span>
    ) : (
      <span className="text-red-500">거부됨</span>
    );
  };

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h2 className="mb-4 text-xl font-bold">Flutter - React 통신 예제</h2>

      {/* FCM 토큰 요청 섹션 */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4">
        <h3 className="mb-3 text-lg font-semibold">FCM 토큰 요청</h3>
        <button
          className="rounded bg-blue-500 px-3 py-1 text-white"
          onClick={handleRequestFcmToken}
          disabled={fcmTokenLoading}
        >
          {fcmTokenLoading ? "요청 중..." : "FCM 토큰 요청"}
        </button>
        {<p>FCM 토큰: {fcmToken}</p>}
      </div>

      {/* 권한 요청 섹션 */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4">
        <h3 className="mb-3 text-lg font-semibold">
          권한 요청 (핸들러 직접 반환)
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 rounded border p-3">
            <div className="flex items-center justify-between">
              <strong>위치 권한</strong>
              <button
                className="rounded bg-blue-500 px-3 py-1 text-white"
                onClick={handleRequestLocationPermission}
                disabled={locationLoading}
              >
                {locationLoading ? "요청 중..." : "권한 요청"}
              </button>
            </div>
            <div>
              상태:{" "}
              {renderPermissionStatus(
                locationGranted,
                locationLoading,
                locationError
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded border p-3">
            <div className="flex items-center justify-between">
              <strong>저장소 권한</strong>
              <button
                className="rounded bg-blue-500 px-3 py-1 text-white"
                onClick={handleRequestStoragePermission}
                disabled={storageLoading}
              >
                {storageLoading ? "요청 중..." : "권한 요청"}
              </button>
            </div>
            <div>
              상태:{" "}
              {renderPermissionStatus(
                storageGranted,
                storageLoading,
                storageError
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded border p-3">
            <div className="flex items-center justify-between">
              <strong>알림 권한</strong>
              <button
                className="rounded bg-blue-500 px-3 py-1 text-white"
                onClick={handleRequestNotificationPermission}
                disabled={notificationLoading}
              >
                {notificationLoading ? "요청 중..." : "권한 요청"}
              </button>
            </div>
            <div>
              상태:{" "}
              {renderPermissionStatus(
                notificationGranted,
                notificationLoading,
                notificationError
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-xs text-gray-500">
        <p>
          * 이 페이지는 Flutter InAppWebView와의 통신을 테스트하기 위한
          예제입니다.
        </p>
        <p>* 실제 Flutter 앱 내에서 실행해야 정상적으로 동작합니다.</p>
      </div>
    </div>
  );
}
