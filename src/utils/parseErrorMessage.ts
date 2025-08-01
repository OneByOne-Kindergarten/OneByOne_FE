export const parseErrorMessage = (error: unknown): string => {
  try {
    if (error instanceof Error) {
      const errorData = JSON.parse(error.message);
      return (
        errorData.data?.message || errorData.message || "오류가 발생했습니다."
      );
    }
  } catch {
    // JSON 파싱 실패 시 기본 메시지 사용
  }
  return "오류가 발생했습니다.";
};
