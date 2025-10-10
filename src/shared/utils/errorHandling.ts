/**
 * 개발환경에서의 에러 처리
 * Sentry 없이도 에러를 적절히 로깅
 */

export function handleError(error: unknown, context?: string) {
  if (import.meta.env.DEV) {
    console.group(`🔴 Error ${context ? `in ${context}` : ""}`);
    console.error(error);
    if (error instanceof Error) {
      console.error("Stack:", error.stack);
    }
    console.groupEnd();
  } else {
    // 프로덕션에서는 Sentry가 자동으로 처리
    console.error("Error occurred:", error);
  }
}

export function handleWarning(message: string, data?: unknown) {
  if (import.meta.env.DEV) {
    console.warn(`⚠️ ${message}`, data);
  }
}

export function handleInfo(message: string, data?: unknown) {
  if (import.meta.env.DEV) {
    console.info(`ℹ️ ${message}`, data);
  }
}
