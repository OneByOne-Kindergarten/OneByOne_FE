import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { URL_PATHS } from "@/shared/constants/url-path";
import { toast } from "@/shared/hooks/useToast";
import Button from "@/shared/ui/buttons/base-button";
import {
  BaseModal,
  ModalContent,
  ModalHeader,
} from "@/shared/ui/modal/base-modal";

import Error from ".";

interface AppErrorFallbackProps {
  error: Error | unknown;
  resetError: () => void;
}

/**
 * 앱 레벨 에러 폴백 컴포넌트
 * Provider 내부에서 작동하므로 Router, Theme 등 모든 Context 사용 가능
 */
export default function AppErrorFallback({
  error,
  resetError,
}: AppErrorFallbackProps) {
  const navigate = useNavigate();
  const errorMessage = String(error);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleGoHome = () => {
    resetError();
    navigate(URL_PATHS.ROOT);
  };

  const handleRetry = () => {
    resetError();
    window.location.reload();
  };

  const handleContactSupport = () => {
    setIsContactModalOpen(true);
  };

  const handleCopyContact = async () => {
    const contactInfo = "saegimworks@gmail.com";

    try {
      await navigator.clipboard.writeText(contactInfo);
      toast({
        title: "메일 주소 복사 완료",
      });
    } catch (err) {
      console.error("복사 실패:", err);
      fallbackCopy(contactInfo);
    }
  };

  const handleCopyErrorDetails = async () => {
    const errorDetails = `📋 오류 정보:
- 메시지: ${errorMessage}
- 발생 시간: ${new Date().toLocaleString("ko-KR")}
- 브라우저: ${navigator.userAgent}
- URL: ${window.location.href}`;

    try {
      await navigator.clipboard.writeText(errorDetails);
      toast({
        title: "오류 정보 복사 완료",
        description: "복사된 내용을 메일로 전달해주세요. 🙂‍↕️",
      });
    } catch (err) {
      console.error("복사 실패:", err);
      fallbackCopy(errorDetails);
    }
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      toast({
        title: "오류 정보 복사 완료",
        description: "복사된 내용을 메일로 전달해주세요.",
      });
      setIsContactModalOpen(false);
    } catch {
      toast({
        title: "복사에 실패했습니다",
        variant: "destructive",
      });
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="w-full pb-8">
        <Error>
          문제가 자동으로 보고되었습니다. <br />
          불편을 드려 죄송합니다.
        </Error>

        <section className="mx-auto w-3/4 space-y-4 md:w-1/2">
          <div>
            <p className="text-xs font-medium text-primary-normal03">
              오류 세부정보
            </p>
            <div className="mt-1.5 rounded bg-primary-foreground p-2">
              <p className="text-xs font-medium text-primary-dark02">
                {errorMessage}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="primary"
              font="md_sb"
              className="w-full px-2.5 py-3"
              onClick={handleGoHome}
            >
              메인화면으로 돌아가기
            </Button>
            <Button
              font="md_sb"
              className="w-full px-2.5 py-3 text-primary-dark01"
              onClick={handleRetry}
            >
              다시 시도하기
            </Button>
          </div>
        </section>

        <section className="mt-6 text-center">
          <p className="text-xs text-primary-dark01">
            문제가 지속되면{" "}
            <button
              onClick={handleContactSupport}
              className="text-tertiary-3 underline hover:opacity-70 active:opacity-70"
            >
              고객지원팀
            </button>
            에 문의주세요.
          </p>
        </section>
      </div>

      {/* 고객지원 문의 모달 */}
      <BaseModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        size="md"
        hasCloseButton={true}
      >
        <ModalHeader
          className="px-3.5 py-4 pb-3.5"
          hasCloseButton={true}
          onClose={() => setIsContactModalOpen(false)}
        />
        <ModalContent className="px-3.5 pb-4">
          <div className="space-y-3.5">
            <div className="space-y-2">
              <h2 className="text-center text-base font-bold text-primary-dark02">
                문의하기
              </h2>
              <p className="truncate text-center text-xs text-primary-dark01">
                문의 사항을 메일로 전달할 수 있어요. <br />
                필요한 경우 내용을 추가해주세요.
              </p>
            </div>
            <ul className="space-y-2">
              <li className="relative h-14 rounded-lg bg-primary-foreground px-3">
                <div className="flex h-full items-center gap-2">
                  <p>🗃️</p>
                  <h3 className="text-sm font-semibold text-primary-dark02">
                    오류정보
                  </h3>
                </div>
                <Button
                  variant="primary"
                  font="xs"
                  size="sm"
                  className="absolute right-3 top-0 w-16 translate-y-1/2 py-1.5"
                  onClick={handleCopyErrorDetails}
                >
                  복사
                </Button>
              </li>
              <li className="relative h-14 rounded-lg bg-primary-foreground px-3">
                <div className="flex h-full items-center gap-2">
                  <p>✉️</p>
                  <div>
                    <h3 className="text-sm font-semibold text-primary-dark02">
                      메일
                    </h3>
                    <p className="text-xxs font-medium text-primary-dark01">
                      saegimworks@gmail.com
                    </p>
                  </div>
                </div>
                <Button
                  variant="primary"
                  font="xs"
                  size="sm"
                  className="absolute right-3 top-0 w-16 translate-y-1/2 py-1.5"
                  onClick={handleCopyContact}
                >
                  문의하기
                </Button>
              </li>
            </ul>
          </div>
        </ModalContent>
      </BaseModal>
    </div>
  );
}
