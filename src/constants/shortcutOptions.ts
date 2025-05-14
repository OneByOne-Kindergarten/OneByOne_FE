import { SVG_PATHS } from "./assets-path";

export const shortcutOptions = [
  {
    name: "유치원 찾기",
    iconName: SVG_PATHS.SHORTCUT.school,
    link: "/school",
  },
  {
    name: "게시글 작성",
    iconName: SVG_PATHS.SHORTCUT.community,
    link: "/community/new",
  },
  {
    name: "예비교사 커뮤니티",
    iconName: SVG_PATHS.CHARACTER.chick,
    link: "/community?type=pre-teacher",
  },
  {
    name: "교사 커뮤니티",
    iconName: SVG_PATHS.CHARACTER.chicken,
    link: "/community?type=teacher",
  },
  {
    name: "1:1 문의",
    iconName: SVG_PATHS.INQUIRY,
    link: "/user/inquiry/new",
  },
  {
    name: "문의내역",
    iconName: SVG_PATHS.QUESTION.BALLOON,
    link: "/user/inquiry/my",
  },
  { name: "나의 리뷰", iconName: SVG_PATHS.POST.edit, link: "/user/my-post" },
];
