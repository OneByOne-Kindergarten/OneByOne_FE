import * as Sentry from "@sentry/react";

/**
 * 환경별 Sentry 설정
 * 개발환경: 에러바운더리만 작동, Sentry 서버 전송 안함
 * 프로덕션: 에러바운더리 + Sentry 서버 전송 + 알림
 */
export function initSentry() {
  const isProd = import.meta.env.PROD;
  const isDev = import.meta.env.DEV;
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (isProd && !dsn) {
    console.warn("⚠️ 프로덕션 환경에서 VITE_SENTRY_DSN이 설정되지 않았습니다.");
    return;
  }

  Sentry.init({
    // 개발환경에서는 더미 DSN 사용 (에러바운더리만 작동)
    dsn: isProd ? dsn : "https://dummy@dummy.ingest.sentry.io/dummy",
    environment: isProd ? "production" : "development",
    debug: false,
    release: "onebyone-fe@1.0.0",

    integrations: [
      // 개발환경에서는 tracing 비활성화
      ...(isProd ? [Sentry.browserTracingIntegration()] : []),

      // 개발환경에서는 replay 비활성화
      ...(isProd
        ? [
            Sentry.replayIntegration({
              maskAllText: true,
              blockAllMedia: true,
            }),
          ]
        : []),
    ],

    tracesSampleRate: isProd ? 0.1 : 0, // 개발: 0% (완전 비활성화), 프로덕션: 10%
    replaysSessionSampleRate: isProd ? 0.1 : 0, // 개발: 0%, 프로덕션: 10%
    replaysOnErrorSampleRate: isProd ? 1.0 : 0, // 개발: 0%, 프로덕션: 100%

    beforeSend(event, hint) {
      // 프로덕션에서만 실제 필터링 및 전송
      if (hint?.originalException instanceof Error) {
        const message = hint.originalException.message;
        const devOnlyErrors = [
          "ResizeObserver",
          "Non-Error promise rejection",
          "ChunkLoadError",
          "Loading chunk",
          "Loading CSS chunk",
          "Script error",
          "Network request failed", // API 일시적 오류
          "AbortError", // 사용자 취소
        ];

        if (devOnlyErrors.some((pattern) => message.includes(pattern))) {
          return null;
        }
      }

      // 간단한 에러 타입 태그만 설정 (실용성 중심)
      if (event.exception?.values?.[0]?.type) {
        event.tags = {
          ...event.tags,
          error_type: event.exception.values[0].type,
        };
      }

      return event;
    },
  });

  // 기본 컨텍스트 설정
  Sentry.setContext("app_info", {
    name: "OneByOne FE",
    version: "1.0.0",
    environment: isProd ? "production" : "development",
  });

  // 브라우저 및 디바이스 정보 태그 설정
  Sentry.setTag(
    "browser_name",
    navigator.userAgent.includes("Chrome")
      ? "Chrome"
      : navigator.userAgent.includes("Safari")
        ? "Safari"
        : navigator.userAgent.includes("Firefox")
          ? "Firefox"
          : "Other"
  );
  Sentry.setTag(
    "is_mobile",
    /Mobile|Android|iPhone|iPad/.test(navigator.userAgent)
  );
  Sentry.setTag("screen_resolution", `${screen.width}x${screen.height}`);
}

/**
 * 사용자 정보를 Sentry에 설정
 * 로그인/로그아웃 시 호출
 */
export function setSentryUser(
  user: {
    userId?: string | number;
    nickname?: string;
    role?: string;
  } | null
) {
  if (user) {
    Sentry.setUser({
      id: String(user.userId),
      username: user.nickname,
    });

    // 사용자 타입별 태그 설정
    Sentry.setTag("user_role", user.role || "unknown");
    Sentry.setTag("user_type", "authenticated");
  } else {
    Sentry.setUser(null);
    Sentry.setTag("user_type", "anonymous");
  }
}
