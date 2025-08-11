import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { userAtom } from "@/entities/auth/model";
import { useUpdateNickname, useUpdateUserRole } from "@/entities/user/hooks";
import { URL_PATHS } from "@/shared/constants/url-path";
import ErrorMessage from "@/shared/ui/form/error-message";
import PageLayout from "@/shared/ui/layout/page-layout";
import { profileSchema } from "@/shared/utils/validationSchemas";
import { useProfileDefaults } from "@/widgets/user-dashboard/profile-editor/lib/useProfileDefaults";
import { useRoleSelection } from "@/widgets/user-dashboard/profile-editor/lib/useRoleSelection";
import { useStartButtonState } from "@/widgets/user-dashboard/profile-editor/lib/useStartButtonState";
import NicknameSection from "@/widgets/user-dashboard/profile-editor/ui/NicknameSection";
import RoleSection from "@/widgets/user-dashboard/profile-editor/ui/RoleSection";
import StartButton from "@/widgets/user-dashboard/profile-editor/ui/StartButton";

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileEditorPage() {
  const navigate = useNavigate();
  const [user] = useAtom(userAtom);

  const {
    mutate: updateNickname,
    isPending: isNicknamePending,
    error: nicknameError,
  } = useUpdateNickname();

  const {
    mutate: updateUserRole,
    isPending: isRolePending,
    error: roleError,
  } = useUpdateUserRole();

  const computedValues = useProfileDefaults(user);

  const { selectedRole, setSelectedRole, handleRoleUpdate } = useRoleSelection(
    computedValues.defaultRole,
    (role, opts) => updateUserRole(role, opts),
    (to) => navigate(to)
  );

  const nicknameFormConfig = useMemo(
    () => ({
      resolver: zodResolver(profileSchema),
      mode: "onChange" as const,
      reValidateMode: "onChange" as const,
      defaultValues: {
        nickname: computedValues.defaultNickname,
      },
    }),
    [computedValues.defaultNickname]
  );
  const nicknameForm = useForm<ProfileFormData>(nicknameFormConfig);

  // 핸들러 함수들을 메모이제이션
  const handleNicknameUpdate = useCallback(
    (data: ProfileFormData) => {
      updateNickname(data.nickname, {
        onSuccess: () => {
          navigate(URL_PATHS.USER);
        },
      });
    },
    [updateNickname, navigate]
  );

  const handleNewUserSubmit = useCallback(() => {
    const nicknameValue = nicknameForm.getValues("nickname");
    if (!nicknameValue || nicknameValue.length < 2) {
      nicknameForm.setError("nickname", {
        type: "manual",
        message: "닉네임은 최소 2자 이상이어야 합니다.",
      });
      return;
    }

    updateNickname(nicknameValue, {
      onSuccess: () => {
        updateUserRole(selectedRole, {
          onSuccess: () => {
            navigate(URL_PATHS.HOME);
          },
        });
      },
    });
  }, [nicknameForm, updateNickname, updateUserRole, selectedRole, navigate]);

  // 에러 상태를 메모이제이션
  const error = useMemo(
    () => nicknameError || roleError,
    [nicknameError, roleError]
  );

  // 시작 버튼 비활성화 상태 (훅은 조건문 밖에서 호출)
  const isStartDisabled = useStartButtonState(
    isNicknamePending,
    isRolePending,
    nicknameForm
  );

  // 페이지 레이아웃 props를 메모이제이션
  const pageLayoutProps = useMemo(
    () => ({
      title: "원바원 | 프로필",
      description: "사용자 프로필 수정",
      headerTitle: computedValues.isNewUser ? undefined : "프로필 수정",
      headerLogo: computedValues.isNewUser ? undefined : true,
      currentPath: URL_PATHS.USER,
      wrapperBg: "white" as const,
      mainClassName: computedValues.isNewUser
        ? "flex flex-col my-auto px-5"
        : "flex flex-col pb-5 mb-24 mt-14 pt-8 px-5",
      isGlobalNavBar: !computedValues.isNewUser,
    }),
    [computedValues.isNewUser]
  );

  return (
    <PageLayout {...pageLayoutProps}>
      {computedValues.isNewUser && (
        <section className="flex flex-col">
          <h1 className="pb-16 text-center text-lg">
            반가워요! <br /> 선생님에 대해 알려주세요!
          </h1>
        </section>
      )}

      <div className="flex flex-col gap-7">
        <NicknameSection
          defaultNickname={computedValues.defaultNickname}
          isNewUser={computedValues.isNewUser}
          isPending={isNicknamePending}
          onSubmit={(nickname) =>
            handleNicknameUpdate({ nickname } as ProfileFormData)
          }
        />

        <RoleSection
          selectedRole={selectedRole}
          isNewUser={computedValues.isNewUser}
          isPending={isRolePending}
          onChange={setSelectedRole}
          onSubmit={handleRoleUpdate}
        />

        {computedValues.isNewUser && (
          <StartButton
            onClick={handleNewUserSubmit}
            isDisabled={isStartDisabled}
          />
        )}
      </div>
      {error && <ErrorMessage error={error.message} />}
    </PageLayout>
  );
}
