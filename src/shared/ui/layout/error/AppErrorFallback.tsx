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

        <div className="mx-auto w-3/4 space-y-4 md:w-1/2">
          <details>
            <summary className="cursor-pointer text-xs text-primary-normal03 active:opacity-70">
              오류 세부정보
            </summary>
            <pre className="mt-2 overflow-auto rounded bg-primary-foreground p-2 text-xs text-primary-dark02">
              {errorMessage}
            </pre>
          </details>
          <Button
            variant="primary"
            size="lg"
            font="md"
            className="w-full"
            onClick={handleGoHome}
          >
            메인화면으로 돌아가기
          </Button>
        </div>

        <div className="mt-6 text-center">
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
        </div>
      </div>

      {/* 고객지원 문의 모달 */}
      <BaseModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        size="md"
        hasCloseButton={true}
      >
        <ModalHeader
          className="p-6 pb-4"
          hasCloseButton={true}
          onClose={() => setIsContactModalOpen(false)}
        >
          <h2 className="text-lg font-bold text-primary-dark02">문의하기</h2>
        </ModalHeader>

        <ModalContent className="px-6 pb-4">
          <div className="mb-4 space-y-6">
            <p className="text-xs text-primary-dark01">
              문의 사항을 메일로 전달할 수 있어요. <br />
              필요한 경우 문의 내용을 추가해주세요.
            </p>
            <div className="space-y-2">
              <div className="rounded-lg bg-primary-foreground p-4">
                <div className="relative">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-primary-dark02">
                      ✉️ 메일
                    </h3>
                    <p className="text-xs text-primary-dark01">
                      saegimworks@gmail.com
                    </p>
                  </div>
                  <Button
                    variant="primary"
                    font="xs_sb"
                    size="sm"
                    className="absolute -right-1 top-0 py-1.5"
                    onClick={handleCopyContact}
                  >
                    복사
                  </Button>
                </div>
              </div>
              <div className="rounded-lg bg-primary-foreground p-4">
                <div className="relative">
                  <div>
                    <h3 className="text-sm font-medium text-primary-dark02">
                      🗃️ 오류 정보
                    </h3>
                  </div>
                  <Button
                    variant="primary"
                    font="xs_sb"
                    size="sm"
                    className="absolute -right-1 -top-1 py-1.5"
                    onClick={handleCopyErrorDetails}
                  >
                    복사
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ModalContent>
      </BaseModal>
    </div>
  );
}
