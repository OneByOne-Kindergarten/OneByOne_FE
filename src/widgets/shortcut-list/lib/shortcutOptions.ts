import { SVG_PATHS } from "@/shared/constants/assets-path";

export const shortcutOptions = [
  {
    name: "유치원 찾기",
    iconName: SVG_PATHS.SHORTCUT.KINDERGARTEN,
    link: "/kindergarten",
  },
  {
    name: "게시글 작성",
    iconName: SVG_PATHS.SHORTCUT.COMMUNITY,
    link: "/community/new",
  },
  {
    name: "예비교사 커뮤니티",
    iconName: SVG_PATHS.CHARACTER.CHICK,
    link: "/community?type=pre-teacher",
  },
  {
    name: "교사 커뮤니티",
    iconName: SVG_PATHS.CHARACTER.CHICKEN,
    link: "/community?type=teacher",
  },
  {
    name: "1:1 문의",
    iconName: SVG_PATHS.USER_MENU.INQUIRY,
    link: "/user/inquiry/new",
  },
  {
    name: "문의내역",
    iconName: SVG_PATHS.QUESTION.BALLOON,
    link: "/user/inquiry/my",
  },
  { name: "나의 리뷰", iconName: SVG_PATHS.POST.EDIT, link: "/user/my-post" },
];
