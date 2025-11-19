// Import statements for all SVG assets
import alarm from "@/app/assets/icons/alarm.svg";
import alert from "@/app/assets/icons/alert.svg";
import apple from "@/app/assets/icons/apple.svg";
import arrowLeft from "@/app/assets/icons/arrow-left.svg";
import arrowLight from "@/app/assets/icons/arrow-light.svg";
import arrowRight from "@/app/assets/icons/arrow-right.svg";
import bookmarkerActive from "@/app/assets/icons/bookmarker-active.svg";
import bookmarkerInactive from "@/app/assets/icons/bookmarker-inactive.svg";
import bookmarks from "@/app/assets/icons/bookmarks.svg";
import boss from "@/app/assets/icons/boss.svg";
import brokenLine from "@/app/assets/icons/broken-line.svg";
import building from "@/app/assets/icons/building.svg";
import call from "@/app/assets/icons/call.svg";
import cancel from "@/app/assets/icons/cancel.svg";
import certification from "@/app/assets/icons/certification-mark.svg";
import characterChick from "@/app/assets/icons/character-chick.svg";
import characterChicken from "@/app/assets/icons/character-chicken.svg";
import characterCry from "@/app/assets/icons/character-cry.svg";
import characterUser from "@/app/assets/icons/character-user.svg";
import chart from "@/app/assets/icons/chart.svg";
import chatColor from "@/app/assets/icons/chat-color.svg";
import chatLine from "@/app/assets/icons/chat-line.svg";
import checkBlue from "@/app/assets/icons/check-primary.svg";
import checkGreen from "@/app/assets/icons/check-secondary.svg";
import child from "@/app/assets/icons/child.svg";
import classIcon from "@/app/assets/icons/class.svg";
import clock from "@/app/assets/icons/clock.svg";
import communityActive from "@/app/assets/icons/community-active.svg";
import communityInactive from "@/app/assets/icons/community-inactive.svg";
import document from "@/app/assets/icons/document.svg";
import email from "@/app/assets/icons/email.svg";
import error from "@/app/assets/icons/error.svg";
import eyeOff from "@/app/assets/icons/eye-off.svg";
import eyeOn from "@/app/assets/icons/eye-on.svg";
import favicon from "@/app/assets/icons/favicon.svg";
import homeActive from "@/app/assets/icons/home-active.svg";
import homeInactive from "@/app/assets/icons/home-inactive.svg";
import homepage from "@/app/assets/icons/homepage.svg";
import inquiry from "@/app/assets/icons/inquiry.svg";
import kakao from "@/app/assets/icons/kakao.svg";
import kebab from "@/app/assets/icons/kebab.svg";
import kindergartenActive from "@/app/assets/icons/kindergarten-active.svg";
import kindergartenInactive from "@/app/assets/icons/kindergarten-inactive.svg";
import leave from "@/app/assets/icons/leave.svg";
import location from "@/app/assets/icons/location.svg";
import logout from "@/app/assets/icons/logout.svg";
import map from "@/app/assets/icons/map.svg";
import naver from "@/app/assets/icons/naver.svg";
import notice from "@/app/assets/icons/notice.svg";
import notificationsOff from "@/app/assets/icons/notifications_off.svg";
import notificationsOn from "@/app/assets/icons/notifications_on.svg";
import policy from "@/app/assets/icons/policy.svg";
import postEdit from "@/app/assets/icons/post-edit.svg";
import post from "@/app/assets/icons/post.svg";
import questionBalloon from "@/app/assets/icons/question-balloon.svg";
import questionGlobal from "@/app/assets/icons/question-global.svg";
import question from "@/app/assets/icons/question.svg";
import radioOff from "@/app/assets/icons/radio-off.svg";
import radioOn from "@/app/assets/icons/radio-on.svg";
import reply from "@/app/assets/icons/reply.svg";
import resetPassword from "@/app/assets/icons/reset-password.svg";
import reviewActive from "@/app/assets/icons/review-active.svg";
import reviewInactive from "@/app/assets/icons/review-inactive.svg";
import search from "@/app/assets/icons/search.svg";
import setting from "@/app/assets/icons/setting.svg";
import share from "@/app/assets/icons/share.svg";
import shortcutCommunity from "@/app/assets/icons/shortcut-post-community.svg";
import shortcutKindergarten from "@/app/assets/icons/shortcut-search-kindergarten.svg";
import starDarkgray from "@/app/assets/icons/star-darkgray.svg";
import starGray from "@/app/assets/icons/star-gray.svg";
import starYellow from "@/app/assets/icons/star-yellow.svg";
import thumbUp from "@/app/assets/icons/thumb-up.svg";
import userActive from "@/app/assets/icons/user-active.svg";
import userInactive from "@/app/assets/icons/user-inactive.svg";
// Import statements for images
import bannerCommunity from "@/app/assets/images/banner-community.webp";
import bannerReviewGuide from "@/app/assets/images/banner-review-guide.webp";
import bannerKindergarten from "@/app/assets/images/banner-school.webp";
import bannerShareGuide from "@/app/assets/images/banner-share-guide.webp";
import certificationImg from "@/app/assets/images/certification.webp";
import guideProfile from "@/app/assets/images/guide-profile.webp";
import landingShare from "@/app/assets/images/landing-share.webp";
import logoInactive from "@/app/assets/images/logo-inactive.webp";
import logoMain from "@/app/assets/images/logo-main.webp";
import openGraph from "@/app/assets/images/open-graph.png";

export const SVG_PATHS = {
  NAV: {
    HOME: {
      active: homeActive,
      inactive: homeInactive,
    },
    KINDERGARTEN: {
      active: kindergartenActive,
      inactive: kindergartenInactive,
    },
    COMMUNITY: {
      active: communityActive,
      inactive: communityInactive,
    },
    REVIEW: {
      active: reviewActive,
      inactive: reviewInactive,
    },
    USER: {
      active: userActive,
      inactive: userInactive,
    },
  },

  AUTH: {
    OAUTH: {
      KAKAO: kakao,
      NAVER: naver,
      APPLE: apple,
    },
    RESET_PASSWORD: resetPassword,
  },

  USER_MENU: {
    SETTING: setting,
    NOTICE: notice,
    DOCUMENT: document,
    INQUIRY: inquiry,
    POLICY: policy,
    LOGOUT: logout,
    LEAVE: leave,
  },

  KINDERGARTEN_INFO: {
    BUILDING: building,
    CHILD: child,
    CLASS: classIcon,
    BOSS: boss,
    CLOCK: clock,
    CHART: chart,
    CERTIFICATION: certification,
    CONTACT: {
      CALL: call,
      EMAIL: email,
      HOMEPAGE: homepage,
    },
    LOCATION: {
      PIN: location,
      MAP: map,
    },
  },

  POST: {
    CREATE: post,
    EDIT: postEdit,
  },
  CHAT: {
    COLOR: chatColor,
    LINE: chatLine,
  },
  THUMB_UP: thumbUp,
  REPLY: reply,
  SHARE: share,

  BOOKMARKS: bookmarks,
  BOOKMARKER: {
    ACTIVE: bookmarkerActive,
    INACTIVE: bookmarkerInactive,
  },

  FORM: {
    RADIO: {
      OFF: radioOff,
      ON: radioOn,
    },
    EYE: {
      OFF: eyeOff,
      ON: eyeOn,
    },
    CHECK: {
      PRIMARY: checkBlue,
      SECONDARY: checkGreen,
    },
  },

  // Rating Icons
  STAR: {
    GRAY: starGray,
    DARKGRAY: starDarkgray,
    YELLOW: starYellow,
  },

  // UI Control Icons
  ARROW: {
    LEFT: arrowLeft,
    RIGHT: arrowRight,
    LIGHT: arrowLight,
  },
  SEARCH: search,
  CANCEL: cancel,
  KEBAB: kebab,

  // System Notifications
  ALARM: alarm,
  NOTIFICATIONS: {
    ON: notificationsOn,
    OFF: notificationsOff,
  },
  ALERT: alert,
  ERROR: error,

  CHARACTER: {
    CHICKEN: characterChicken,
    CHICK: characterChick,
    USER: characterUser,
    CRY: characterCry,
  },

  QUESTION: {
    BASE: question,
    GLOBAL: questionGlobal,
    BALLOON: questionBalloon,
  },

  SHORTCUT: {
    KINDERGARTEN: shortcutKindergarten,
    COMMUNITY: shortcutCommunity,
  },

  // Miscellaneous
  FAVICON: favicon,
  BROKEN_LINE: brokenLine,
};

export const IMAGE_PATHS = {
  LOGO: {
    MAIN: logoMain,
    INACTIVE: logoInactive,
  },
  LANDING: {
    SHARE: landingShare,
  },
  BANNER: {
    KINDERGARTEN: bannerKindergarten,
    COMMUNITY: bannerCommunity,
    REVIEW_GUIDE: bannerReviewGuide,
    SHARE_GUIDE: bannerShareGuide,
  },
  CERTIFICATION: certificationImg,
  GUIDE: {
    PROFILE: guideProfile,
  },
  OPEN_GRAPH: openGraph,
};
