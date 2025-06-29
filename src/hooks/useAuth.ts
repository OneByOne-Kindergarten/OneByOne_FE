import { useMutation } from "@tanstack/react-query";
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "@/types/authDTO";
import { signIn, signUp, signOut } from "@/services/authService";
import {
  updateNickname,
  updatePassword,
  withdrawUser,
  updateUserRole,
} from "@/services/userService";
import { toast } from "@/hooks/useToast";
import { useNavigate } from "react-router-dom";
import { URL_PATHS } from "@/constants/url-path";

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
        title: `선생님, 어서오세요!`,
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
        title: "닉네임 변경 성공",
        description: "닉네임이 성공적으로 변경되었습니다.",
        variant: "default",
      });
    },
    onError: (error) => {
      let errorMessage = "닉네임 변경에 실패했습니다. 다시 시도해주세요.";

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
          title: "비밀번호 변경 성공",
          description: "비밀번호가 성공적으로 변경되었습니다.",
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
        description: "안녕히가세요!",
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
        description: "그동안 이용해주셔서 감사합니다.",
        variant: "default",
      });
      navigate(URL_PATHS.SIGNIN);
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
        description: "지금 바로 로그인해보세요!",
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
                title: "회원가입 성공",
                description: "회원가입이 완료되었습니다. 로그인해주세요.",
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
 * 사용자 역할 변경 API 호출
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
    onSuccess: () => {
      toast({
        title: "역할 변경 성공",
        variant: "default",
      });
    },
    onError: (error) => {
      let errorMessage = "역할 변경에 실패했습니다. 다시 시도해주세요.";

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
        title: "역할 변경 실패",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
