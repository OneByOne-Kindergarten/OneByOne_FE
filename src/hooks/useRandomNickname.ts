import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

const RANDOM_STRING_LENGTH = 7;
const RANDOM_STRING_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const RANDOM_NICKNAME_PREFIX = "익명_";

interface UseRandomNicknameProps {
  setValue: UseFormSetValue<any>;
}

interface UseRandomNicknameReturn {
  isRandomNickname: boolean;
  handleRandomNickname: () => void;
  handleManualNickname: () => void;
}

/**
 * 랜덤 닉네임 생성 및 관리 훅
 * @param setValue - useForm의 setValue 함수
 * @returns 랜덤 닉네임 관련 상태와 핸들러 함수들
 */
export const useRandomNickname = ({
  setValue,
}: UseRandomNicknameProps): UseRandomNicknameReturn => {
  const [isRandomNickname, setIsRandomNickname] = useState(false);

  const getRandomString = (length: number): string => {
    return Array.from({ length }, () =>
      RANDOM_STRING_CHARS.charAt(
        Math.floor(Math.random() * RANDOM_STRING_CHARS.length)
      )
    ).join("");
  };

  const handleRandomNickname = (): void => {
    const randomString = getRandomString(RANDOM_STRING_LENGTH);
    const randomNickname = `${RANDOM_NICKNAME_PREFIX}${randomString}`;
    setValue("nickname", randomNickname, { shouldValidate: true });
    setIsRandomNickname(true);
  };

  const handleManualNickname = (): void => {
    setValue("nickname", "", { shouldValidate: true });
    setIsRandomNickname(false);
  };

  return {
    isRandomNickname,
    handleRandomNickname,
    handleManualNickname,
  };
};
