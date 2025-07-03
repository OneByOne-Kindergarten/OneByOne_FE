// Import statements for all SVG assets
import alarm from "@/assets/icons/alarm.svg";
import alert from "@/assets/icons/alert.svg";
import apple from "@/assets/icons/apple.svg";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import arrowRight from "@/assets/icons/arrow-right.svg";
import bookmarkerActive from "@/assets/icons/bookmarker-active.svg";
import bookmarkerInactive from "@/assets/icons/bookmarker-inactive.svg";
import bookmarksActive from "@/assets/icons/bookmarks-active.svg";
import bookmarksInactive from "@/assets/icons/bookmarks-inactive.svg";
import boss from "@/assets/icons/boss.svg";
import brokenLine from "@/assets/icons/broken-line.svg";
import building from "@/assets/icons/building.svg";
import call from "@/assets/icons/call.svg";
import cancel from "@/assets/icons/cancel.svg";
import certification from "@/assets/icons/certification-mark.svg";
import characterChick from "@/assets/icons/character-chick.svg";
import characterChicken from "@/assets/icons/character-chicken.svg";
import characterUser from "@/assets/icons/character-user.svg";
import chart from "@/assets/icons/chart.svg";
import chatColor from "@/assets/icons/chat-color.svg";
import chatLine from "@/assets/icons/chat-line.svg";
import checkBlue from "@/assets/icons/check-blue.svg";
import checkGreen from "@/assets/icons/check-green.svg";
import child from "@/assets/icons/child.svg";
import classIcon from "@/assets/icons/class.svg";
import clock from "@/assets/icons/clock.svg";
import communityActive from "@/assets/icons/community-active.svg";
import communityInactive from "@/assets/icons/community-inactive.svg";
import document from "@/assets/icons/document.svg";
import email from "@/assets/icons/email.svg";
import error from "@/assets/icons/error.svg";
import eyeOff from "@/assets/icons/eye-off.svg";
import eyeOn from "@/assets/icons/eye-on.svg";
import favicon from "@/assets/icons/favicon.svg";
import homeActive from "@/assets/icons/home-active.svg";
import homeInactive from "@/assets/icons/home-inactive.svg";
import homepage from "@/assets/icons/homepage.svg";
import inquiry from "@/assets/icons/inquiry.svg";
import kakao from "@/assets/icons/kakao.svg";
import kebab from "@/assets/icons/kebab.svg";
import leave from "@/assets/icons/leave.svg";
import location from "@/assets/icons/location.svg";
import logout from "@/assets/icons/logout.svg";
import map from "@/assets/icons/map.svg";
import naver from "@/assets/icons/naver.svg";
import notice from "@/assets/icons/notice.svg";
import notificationsOff from "@/assets/icons/notifications_off.svg";
import notificationsOn from "@/assets/icons/notifications_on.svg";
import policy from "@/assets/icons/policy.svg";
import postEdit from "@/assets/icons/post-edit.svg";
import post from "@/assets/icons/post.svg";
import questionBalloon from "@/assets/icons/question-balloon.svg";
import questionGlobal from "@/assets/icons/question-global.svg";
import question from "@/assets/icons/question.svg";
import radioOff from "@/assets/icons/radio-off.svg";
import radioOn from "@/assets/icons/radio-on.svg";
import reply from "@/assets/icons/reply.svg";
import resetPassword from "@/assets/icons/reset-password.svg";
import schoolActive from "@/assets/icons/school-active.svg";
import schoolInactive from "@/assets/icons/school-inactive.svg";
import search from "@/assets/icons/search.svg";
import setting from "@/assets/icons/setting.svg";
import share from "@/assets/icons/share.svg";
import shortcutCommunity from "@/assets/icons/shortcut-post-community.svg";
import shortcutSchool from "@/assets/icons/shortcut-search-school.svg";
import starDarkgray from "@/assets/icons/star-darkgray.svg";
import starGray from "@/assets/icons/star-gray.svg";
import starYellow from "@/assets/icons/star-yellow.svg";
import thumbUp from "@/assets/icons/thumb-up.svg";
import userActive from "@/assets/icons/user-active.svg";
import userInactive from "@/assets/icons/user-inactive.svg";
// Import statements for images
import bannerCommunity from "@/assets/images/banner-community.webp";
import bannerSchool from "@/assets/images/banner-school.webp";
import certificationImg from "@/assets/images/certification.webp";
import guideProfile from "@/assets/images/guide-profile.webp";
import logoInactive from "@/assets/images/logo-inactive.webp";
import logoMain from "@/assets/images/logo-main.webp";

export const SVG_PATHS = {
  FAVICON: favicon,
  HOME: {
    active: homeActive,
    inactive: homeInactive,
  },
  SCHOOL: {
    active: schoolActive,
    inactive: schoolInactive,
  },
  COMMUNITY: {
    active: communityActive,
    inactive: communityInactive,
  },
  BOOKMARKS: {
    active: bookmarksActive,
    inactive: bookmarksInactive,
  },
  USER: {
    active: userActive,
    inactive: userInactive,
  },
  POST: {
    create: post,
    edit: postEdit,
  },
  RADIO: {
    off: radioOff,
    on: radioOn,
  },
  ARROW: {
    left: arrowLeft,
    right: arrowRight,
  },
  STAR: {
    gray: starGray,
    darkgray: starDarkgray,
    yellow: starYellow,
  },
  EYE: {
    off: eyeOff,
    on: eyeOn,
  },
  CHAT: {
    color: chatColor,
    line: chatLine,
  },
  OAUTH: {
    kakao: kakao,
    naver: naver,
    apple: apple,
  },
  CHARACTER: {
    chicken: characterChicken,
    chick: characterChick,
    user: characterUser,
  },
  SHORTCUT: {
    school: shortcutSchool,
    community: shortcutCommunity,
  },
  CALL: call,
  EMAIL: email,
  KEBAB: kebab,
  NOTICE: notice,
  DOCUMENT: document,
  CHART: chart,
  THUMB_UP: thumbUp,
  REPLY: reply,
  SHARE: share,
  ALARM: alarm,
  NOTIFICATIONS: {
    on: notificationsOn,
    off: notificationsOff,
  },
  ALERT: alert,
  BOOKMARKER: {
    active: bookmarkerActive,
    inactive: bookmarkerInactive,
  },
  CHECK: {
    green: checkGreen,
    blue: checkBlue,
  },
  RESET: {
    password: resetPassword,
  },
  QUESTION: {
    BASE: question,
    GLOBAL: questionGlobal,
    BALLOON: questionBalloon,
  },
  ERROR: error,
  CANCEL: cancel,
  INQUIRY: inquiry,
  MAP: map,
  POLICY: policy,
  SEARCH: search,
  SETTING: setting,
  LOCATION: location,
  HOMEPAGE: homepage,
  BUILDING: building,
  CHILD: child,
  CLASS: classIcon,
  BOSS: boss,
  CLOCK: clock,
  BROKEN_LINE: brokenLine,
  CERTIFICATION: certification,
  LOGOUT: logout,
  LEAVE: leave,
};

export const IMAGE_PATHS = {
  LOGO: {
    MAIN: logoMain,
    INACTIVE: logoInactive,
  },
  BANNER: {
    SCHOOL: bannerSchool,
    COMMUNITY: bannerCommunity,
  },
  CERTIFICATION: certificationImg,
  GUIDE: {
    PROFILE: guideProfile,
  },
};
