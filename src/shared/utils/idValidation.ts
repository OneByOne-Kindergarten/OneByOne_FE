/**
 * ID가 유효한 숫자인지 검증하는 함수
 * @param id string
 * @returns boolean
 */
export const isValidId = (id: string | undefined): boolean => {
  if (!id || id === "unknown") return false;
  const numId = Number(id);
  return !isNaN(numId) && numId > 0;
};

/**
 * ID 변환 함수
 * @param id string
 * @returns number | null
 */
export const safeParseId = (id: string | undefined): number | null => {
  if (!isValidId(id)) return null;
  return Number(id);
};
