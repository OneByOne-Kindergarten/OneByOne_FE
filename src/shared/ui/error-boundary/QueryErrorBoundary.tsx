import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Button from "@/shared/ui/buttons/base-button";
import Error from "@/shared/ui/layout/error";

interface QueryErrorBoundaryProps {
  children: ReactNode;
  fallbackMessage?: string;
  showRetryButton?: boolean;
  className?: string;
}

/**
 * React Query와 함께 사용하는 에러 바운더리 컴포넌트
 * throwOnError: true 옵션과 함께 사용하여 자동 에러 처리
 */
export default function QueryErrorBoundary({
  fallbackMessage = "데이터를 불러오는 중 오류가 발생했어요.",
  showRetryButton = false,
  children,
  className,
}: QueryErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <>
              <Error className={className}>{fallbackMessage}</Error>
              {showRetryButton && (
                <Button variant="primary" onClick={resetErrorBoundary}>
                  다시 시도
                </Button>
              )}
            </>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
