import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { URL_PATHS } from "@/common/constants/url-path";
import { userAtom } from "@/entities/auth/model";

import { getUserInfo } from "../../user/api";
import { updateUserShortcuts } from "../api";
import { Shortcut, UpdateShortcutsResponse } from "../DTO";

export const useShortcuts = () => {
  const [user, setUser] = useAtom(userAtom);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 바로가기 목록 가져오기 (userStore 사용)
  const getShortcuts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // 유저 정보가 없거나 homeShortcut이 없는 경우 유저 정보 다시 조회
      if (!user || !user.homeShortcut) {
        const userData = await getUserInfo();
        if (
          userData &&
          userData.homeShortcut &&
          userData.homeShortcut.shortcuts
        ) {
          setShortcuts(userData.homeShortcut.shortcuts);
        } else {
          // 기본 바로가기 설정
          const defaultShortcuts: Shortcut[] = [
            {
              name: "유치원찾기",
              iconName: "kindergarten",
              link: "/kindergarten",
            },
            {
              name: "게시글작성",
              iconName: "community",
              link: "/community/new",
            },
          ];
          setShortcuts(defaultShortcuts);
        }
      } else {
        // 유저 정보에서 바로가기 목록 가져오기
        setShortcuts(user.homeShortcut.shortcuts);
      }
    } catch (err) {
      setError("바로가기 정보를 불러오는데 실패했습니다.");
      console.error("바로가기 로드 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 바로가기 업데이트
  const updateShortcuts = async (
    newShortcuts: Shortcut[]
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      // API 호출
      const response: UpdateShortcutsResponse =
        await updateUserShortcuts(newShortcuts);

      if (response.success) {
        setShortcuts(newShortcuts);

        // 유저 정보 업데이트
        if (user) {
          const updatedUser = {
            ...user,
            homeShortcut: {
              shortcuts: newShortcuts,
            },
          };
          setUser(updatedUser);
        }

        return true;
      } else {
        setError(response.message || "바로가기 업데이트에 실패했습니다.");
        return false;
      }
    } catch (err) {
      setError("바로가기 업데이트에 실패했습니다.");
      console.error("바로가기 업데이트 실패:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 바로가기 편집 페이지로 이동
  const navigateToEdit = () => {
    navigate(URL_PATHS.SHORTCUTS_EDITOR);
  };

  useEffect(() => {
    getShortcuts();
  }, [user]);

  return {
    shortcuts,
    isLoading,
    error,
    updateShortcuts,
    navigateToEdit,
  };
};
