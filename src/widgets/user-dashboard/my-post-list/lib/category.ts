import { REVIEW_TYPES } from "@/shared/constants/review";
import { URL_PATHS } from "@/shared/constants/url-path";

export const MY_REVIEW_CATEGORY_OPTIONS = [
  {
    href: `${URL_PATHS.USER_POST}?type=${REVIEW_TYPES.WORK}`,
    label: "근무리뷰",
  },
  {
    href: `${URL_PATHS.USER_POST}?type=${REVIEW_TYPES.LEARNING}`,
    label: "실습리뷰",
  },
];
