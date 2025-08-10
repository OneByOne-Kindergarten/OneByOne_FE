import type { CommunityCategoryType } from "@/shared/constants/community";
import { CATEGORY_INFO, CATEGORY_LABELS } from "@/shared/constants/community";

/**
 * 하위 카테고리 value를 label로 변환
 * @param categoryName
 * @returns label
 */
export function getCategoryLabel(categoryName: string): string {
  return CATEGORY_LABELS[categoryName] || categoryName;
}

/**
 * 대문자 상위 카테고리를 소문자로 변환
 * @param categoryType TEACHER || PROSPECTIVE_TEACHER
 * @returns teacher || pre-teacher
 */
export function convertCategoryTypeToLowercase(
  categoryType: CommunityCategoryType
): "teacher" | "pre-teacher" {
  return categoryType === "TEACHER" ? "teacher" : "pre-teacher";
}

/**
 * 소문자 상위 카테고리를 대문자로 변환
 * @param category teacher || pre-teacher
 * @returns TEACHER || PROSPECTIVE_TEACHER
 */
export function convertCategoryTypeToUppercase(
  category: "teacher" | "pre-teacher"
): CommunityCategoryType {
  return category === "teacher" ? "TEACHER" : "PROSPECTIVE_TEACHER";
}

/**
 * 상위 카테고리에 속하는 하위 카테고리 목록 반환
 * @param categoryType 상위 카테고리
 * @returns 하위 카테고리 목록 배열 (value, label 형식)
 */
export function getCategoryOptions(categoryType: CommunityCategoryType) {
  return CATEGORY_INFO[categoryType].postCategories;
}

/**
 * 상위 카테고리에 속하는 첫 번째 하위 카테고리 반환
 * @param categoryType 상위 카테고리
 * @returns 첫 번째 하위 카테고리
 */
export function getFirstCategoryName(
  categoryType: CommunityCategoryType
): string {
  const postCategories = CATEGORY_INFO[categoryType].postCategories;
  return postCategories.length > 0 ? postCategories[0].value : "";
}

/**
 * 상위 카테고리에 주어진 카테고리 이름이 속하는지 검토
 * @param categoryName 확인할 하위 카테고리
 * @param categoryType 상위 카테고리
 * @returns 속하면 true, 아니면 false
 */
export function isCategoryNameValid(
  categoryName: string,
  categoryType: CommunityCategoryType
): boolean {
  return CATEGORY_INFO[categoryType].postCategories.some(
    (cat) => cat.value === categoryName
  );
}

/**
 * 상위 카테고리에 속하는 적절한 하위 카테고리 반환
 * @param categoryName 확인할 하위 카테고리
 * @param categoryType 상위 카테고리
 * @returns 유효한 경우 원래 이름, 아니면 해당 타입의 첫 번째 하위 카테고리
 */
export function getValidCategoryName(
  categoryName: string,
  categoryType: CommunityCategoryType
): string {
  if (isCategoryNameValid(categoryName, categoryType)) {
    return categoryName;
  }
  return getFirstCategoryName(categoryType);
}

/**
 * 커뮤니티 경로 생성
 * @param categoryType 상위 카테고리
 * @param categoryName 하위 카테고리
 * @returns 경로 문자열
 */
export function createCommunityPath(
  categoryType: "teacher" | "pre-teacher",
  categoryName?: string
): string {
  const categoryParam = categoryName ? `&category=${categoryName}` : "";
  return `/community?type=${categoryType}${categoryParam}`;
}
