import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { URL_PATHS } from "@/constants/url-path";
import { toast } from "@/hooks/useToast";
import { resetPassword, signIn, signOut, signUp } from "@/services/authService";
import {
  checkEmailCertification,
  sendEmailCertification,
  updateNickname,
  updatePassword,
  updateUserRole,
  withdrawUser,
} from "@/services/userService";
import {
  ResetPasswordRequest,
  ResetPasswordResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/types/authDTO";

interface SignupCallbacks {
  onComplete?: () => void; // 완료 시 추가 동작
}

interface PasswordUpdateParams {
  currentPassword: string;
  newPassword: string;
}

/**
 * 로그인 API 호출
 * - 에러 처리
 * - 토스트 관리
 */
export const useSignIn = () => {
  const navigate = useNavigate();

  return useMutation<SignInResponse, Error, SignInRequest>({
    mutationFn: signIn,
    onSuccess: () => {
      toast({
        title: `선생님, 어서오세요! 🤗`,
        variant: "default",
      });

      navigate(URL_PATHS.HOME);
    },
    onError: (error) => {
      let errorMessage = "이메일 또는 비밀번호를 다시 확인해주세요.";

      if (error instanceof Error) {
        try {
          const errorObj = JSON.parse(error.message);
          if (errorObj.data?.message) {
            errorMessage = errorObj.data.message;
          }
        } catch (e) {
          if (error.message && error.message !== "Failed to fetch") {
            errorMessage = error.message;
          }
        }
      }

      toast({
        title: "로그인 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

/**
 * 닉네임 변경 API 호출
 * - 에러 처리
 * - 토스트 관리
 */
export const useUpdateNickname = () => {
  return useMutation<boolean, Error, string>({
    mutationFn: (newNickname: string) => updateNickname(newNickname),
    onSuccess: () => {
      toast({
        title: "닉네임 설정 완료",
        description: "새로운 닉네임으로 활동해보세요. 🤗",
        variant: "default",
      });
    },
    onError: (error) => {
      let errorMessage = "잠시 후 다시 시도해주세요.";

      if (error instanceof Error) {
        try {
          const errorObj = JSON.parse(error.message);
          if (errorObj.data?.message) {
            errorMessage = errorObj.data.message;
          }
        } catch (e) {
          if (error.message && error.message !== "Failed to fetch") {
            errorMessage = error.message;
          }
        }
      }

      toast({
        title: "닉네임 변경 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

/**
 * 비밀번호 변경 API 호출
 * - 에러 처리
 * - 토스트 관리
 */
export const useUpdatePassword = () => {
  return useMutation<boolean, Error, PasswordUpdateParams>({
    mutationFn: ({ currentPassword, newPassword }) =>
      updatePassword(currentPassword, newPassword),
    onSuccess: (success) => {
      if (success) {
        toast({
          title: "비밀번호 변경 완료",
          description: "새로운 비밀번호로 로그인해보세요. 🔓",
          variant: "default",
        });
      } else {
        toast({
          title: "비밀번호 변경 실패",
          description: "현재 비밀번호가 일치하지 않습니다.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      let errorMessage = "비밀번호 변경에 실패했습니다. 다시 시도해주세요.";

      if (error instanceof Error) {
        try {
          const errorObj = JSON.parse(error.message);
          if (errorObj.data?.message) {
            errorMessage = errorObj.data.message;
          }
        } catch (e) {
          if (error.message && error.message !== "Failed to fetch") {
            errorMessage = error.message;
          }
        }
      }

      toast({
        title: "비밀번호 변경 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

/**
 * 로그아웃 API 호출
 * - 에러 처리
 * - 토스트 관리
 * - 성공 시 로그인 페이지로 이동
 */
export const useSignOut = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      toast({
        title: "로그아웃 완료",
        description: "다음에 또 만나요! 🤗",
        variant: "default",
      });
      navigate(URL_PATHS.ROOT);
    },
    onError: (error) => {
      let errorMessage = "로그아웃에 실패했습니다. 다시 시도해주세요.";

      if (error instanceof Error) {
        try {
          const errorObj = JSON.parse(error.message);
          if (errorObj.data?.message) {
            errorMessage = errorObj.data.message;
          }
        } catch (e) {
          if (error.message && error.message !== "Failed to fetch") {
            errorMessage = error.message;
          }
        }
      }

      toast({
        title: "로그아웃 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

/**
 * 회원 탈퇴 API 호출
 * - 에러 처리
 * - 토스트 관리
 * - 성공 시 로그인 페이지로 이동
 */
export const useWithdrawUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => withdrawUser(),
    onSuccess: () => {
      toast({
        title: "회원 탈퇴 완료",
        description: "그동안 이용해주셔서 감사합니다. 🥲",
        variant: "default",
      });
      navigate(URL_PATHS.ROOT);
    },
    onError: (error) => {
      let errorMessage = "회원 탈퇴에 실패했습니다. 다시 시도해주세요.";

      if (error instanceof Error) {
        try {
          const errorObj = JSON.parse(error.message);
          if (errorObj.data?.message) {
            errorMessage = errorObj.data.message;
          }
        } catch (e) {
          if (error.message && error.message !== "Failed to fetch") {
            errorMessage = error.message;
          }
        }
      }

      toast({
        title: "회원 탈퇴 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

/**
 * 회원가입 API 호출
 * - 에러 처리
 * - 토스트 관리
 */
export const useSignUp = (callbacks?: SignupCallbacks) => {
  const navigate = useNavigate();

  return useMutation<SignUpResponse, Error, SignUpRequest>({
    mutationFn: signUp,
    onSuccess: () => {
      toast({
        title: "회원가입 완료",
        description: "지금 바로 로그인해보세요! 🎉",
        variant: "default",
      });

      if (callbacks?.onComplete) {
        callbacks.onComplete();
      }

      navigate(URL_PATHS.SIGNIN);
    },
    onError: (error) => {
      let errorMessage = "잠시 후 다시 시도해주세요.";

      if (error instanceof Error) {
        try {
          const errorObj = JSON.parse(error.message);
          if (errorObj.data?.message) {
            errorMessage = errorObj.data.message;
          }
        } catch (e) {
          // 파싱 실패
          if (error.message && error.message !== "Failed to fetch") {
            // 응답 형식 오류지만 회원가입은 성공
            if (error.message.includes("Failed to parse JSON response")) {
              toast({
                title: "회원가입 완료",
                description: "지금 바로 로그인해보세요! 🎉",
                variant: "default",
              });
              navigate(URL_PATHS.SIGNIN);
              return;
            }

            errorMessage = error.message;
          }
        }
      }

      toast({
        title: "회원가입 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

/**
 * 사용자 권한 변경 API 호출
 * - 에러 처리
 * - 토스트 관리
 */
export const useUpdateUserRole = () => {
  return useMutation<
    boolean,
    Error,
    "TEACHER" | "PROSPECTIVE_TEACHER" | "ADMIN" | "GENERAL"
  >({
    mutationFn: (role) => updateUserRole(role),
    onError: (error) => {
      const errorMessage =
        (() => {
          try {
            return JSON.parse(error.message).data?.message;
          } catch {
            return error.message;
          }
        })() || "잠시 후 다시 시도해주세요.";

      toast({
        title: "변경 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

/**
 * 이메일 인증 번호 발송 API 호출
 */
export const useSendEmailCertification = () => {
  return useMutation<boolean, Error, string>({
    mutationFn: (email) => sendEmailCertification(email),
    onError: (error) => {
      const errorMessage =
        (() => {
          try {
            return JSON.parse(error.message).data?.message;
          } catch {
            return error.message;
          }
        })() || "잠시 후 다시 시도해주세요.";

      toast({
        title: "인증번호 발송 오류",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("이메일 인증번호 발송 실패:", error);
    },
  });
};

/**
 * 이메일 인증 번호 검증 API 호출
 */
export const useCheckEmailCertification = () => {
  return useMutation<boolean, Error, { email: string; certification: string }>({
    mutationFn: ({ email, certification }) =>
      checkEmailCertification(email, certification),
    onError: (error) => {
      const errorMessage =
        (() => {
          try {
            return JSON.parse(error.message).data?.message;
          } catch {
            return error.message;
          }
        })() || "잠시 후 다시 시도해주세요.";

      toast({
        title: "인증번호 검증 오류",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};

/**
 * 임시 비밀번호 요청 API 호출
 * - 에러 처리
 * - 토스트 관리
 * - 성공 시 로그인 페이지로 이동
 */
export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast({
        title: "임시 비밀번호 발송 완료",
        description: "로그인 후 비밀번호를 변경해주세요.",
        variant: "default",
      });
      navigate(URL_PATHS.SIGNIN);
    },
    onError: (error) => {
      let errorMessage = "잠시 후 다시 시도해주세요.";

      if (error instanceof Error) {
        try {
          const errorObj = JSON.parse(error.message);
          if (errorObj.data?.message) {
            errorMessage = errorObj.data.message;
          }
        } catch (e) {
          if (error.message && error.message !== "Failed to fetch") {
            errorMessage = error.message;
          }
        }
      }

      toast({
        title: "임시 비밀번호 발송 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
