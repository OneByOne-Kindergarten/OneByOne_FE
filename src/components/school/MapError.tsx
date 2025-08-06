import { SVG_PATHS } from "@/constants/assets-path";

const ERROR_MAPPINGS = [
  {
    keywords: ["network", "NetworkError"],
    message: "네트워크 연결이 끊겨 위치를 찾을 수 없습니다.",
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

const DEFAULT_ERROR_MESSAGE = "지도에서 현재 위치를 찾을 수 없습니다.";

// 에러 메시지 변환 함수
const getErrorMessage = (error: unknown): string => {
  if (!error) {
    return DEFAULT_ERROR_MESSAGE;
  }

  if (typeof error === "string") {
    return error;
  }

  const errorMessage =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : String(error);

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
  error: unknown; // 원시 에러 객체 또는 문자열
}

export default function MapError({ height, error }: MapErrorProps) {
  const errorMessage = getErrorMessage(error);

  return (
    <div
      className={`${height} flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-primary-normal01 bg-primary-light01 p-6`}
    >
      <img
        src={SVG_PATHS.CHARACTER.cry}
        alt="경고"
        width={46}
        height={52}
        className="mx-auto mb-2 h-16 w-14"
      />
      <p className="-mt-2 text-center text-xs font-medium text-primary-dark01">
        {errorMessage} <br /> 검색으로 탐색해주세요.
      </p>
    </div>
  );
}
