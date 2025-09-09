export const parseErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    if (error.message !== "Failed to fetch") {
      return error.message;
    }
  }
  return "오류가 발생했습니다.";
};
