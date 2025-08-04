import Button from "@/components/@shared/buttons/base-button";
import { SVG_PATHS } from "@/constants/assets-path";

// 에러 매핑 테이블
const ERROR_MAPPINGS = [
  {
    keywords: ["network", "NetworkError"],
    message: "네트워크 연결을 확인해주세요.",
  },
  {
    keywords: ["API", "key", "auth"],
    message: "지도 서비스에 일시적인 문제가 발생했습니다.",
  },
  {
    keywords: ["permission", "denied"],
    message: "지도 접근 권한이 없습니다.",
  },
  {
    keywords: ["coordinate", "invalid"],
    message: "잘못된 위치 정보입니다.",
  },
  {
    keywords: ["timeout"],
    message: "지도 로딩 시간이 초과되었습니다.",
  },
];

const DEFAULT_ERROR_MESSAGE = "일시적인 오류가 발생했습니다.";
const EMPTY_ERROR_MESSAGE = "위치 정보를 찾을 수 없습니다.";

// 에러 메시지 변환 함수
const getErrorMessage = (error: unknown): string => {
  if (!error) {
    return EMPTY_ERROR_MESSAGE;
  }

  // 문자열 에러인 경우 그대로 사용
  if (typeof error === "string") {
    return error;
  }

  // 에러 메시지 추출
  const errorMessage =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : String(error);

  if (!errorMessage) {
    return EMPTY_ERROR_MESSAGE;
  }

  // 매핑 테이블에서 매칭되는 에러 찾기
  const matchedError = ERROR_MAPPINGS.find(({ keywords }) =>
    keywords.some((keyword) =>
      errorMessage.toLowerCase().includes(keyword.toLowerCase())
    )
  );

  return matchedError ? matchedError.message : DEFAULT_ERROR_MESSAGE;
};

interface MapErrorProps {
  height: string;
  latitude: number;
  longitude: number;
  error: unknown; // 원시 에러 객체 또는 문자열
}

export default function MapError({
  height,
  latitude,
  longitude,
  error,
}: MapErrorProps) {
  const errorMessage = getErrorMessage(error);

  return (
    <div
      className={`${height} flex w-full flex-col items-center justify-center gap-6 rounded-lg border border-primary-light02 bg-primary-normal01 p-6`}
    >
      <div className="text-center">
        <img
          src={SVG_PATHS.ALERT}
          alt="경고"
          className="mx-auto mb-2 h-6 w-6"
        />
        <p className="-mt-2 font-medium">{errorMessage}</p>
      </div>

      <div className="flex w-full flex-col gap-2 rounded-lg bg-white p-3 text-center opacity-80">
        <div>
          <img
            src={SVG_PATHS.LOCATION}
            alt="위치"
            className="mx-auto mb-2 h-6 w-6"
          />
          <p className="mb-2 text-sm font-medium text-primary-dark02">
            현재 위치
          </p>
          <p className="text-xs text-primary-normal03">
            위도: {latitude.toFixed(2)}
          </p>
          <p className="text-xs text-primary-normal03">
            경도: {longitude.toFixed(2)}
          </p>
        </div>
        <Button
          onClick={() => {
            const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            window.open(googleMapsUrl, "_blank");
          }}
          variant="secondary"
          size="md"
          font="xs"
        >
          구글맵에서 보기
        </Button>
      </div>
    </div>
  );
}
