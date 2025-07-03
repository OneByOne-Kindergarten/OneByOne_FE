import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import Button from "@/components/@shared/buttons/base-button";
import { Form } from "@/components/@shared/form";
import ErrorMessage from "@/components/@shared/form/error-message";
import PageLayout from "@/components/@shared/layout/page-layout";
import { NicknameField } from "@/components/sign-up/NicknameField";
import { RoleField } from "@/components/sign-up/RoleField";
import { CommunityCategoryType } from "@/constants/community";
import { URL_PATHS } from "@/constants/url-path";
import { useUpdateNickname, useUpdateUserRole } from "@/hooks/useAuth";
import { userAtom } from "@/stores/userStore";
import { profileSchema } from "@/utils/validationSchemas";

const roleSchema = z.object({
  role: z.enum(["TEACHER", "PROSPECTIVE_TEACHER"], {
    errorMap: () => ({ message: "회원 유형을 선택해주세요." }),
  }),
});

type ProfileFormData = z.infer<typeof profileSchema>;
type RoleFormData = z.infer<typeof roleSchema>;

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

  const computedValues = useMemo(() => {
    const isNewUser = !user?.role || user.role === "GENERAL";
    const defaultRole =
      !user?.role || user.role === "GENERAL" || user.role === "ADMIN"
        ? "TEACHER"
        : (user.role as CommunityCategoryType);
    const defaultNickname = user?.nickname || "";

    return {
      isNewUser,
      defaultRole,
      defaultNickname,
    };
  }, [user?.role, user?.nickname]);

  const [selectedRole, setSelectedRole] = useState<CommunityCategoryType>(
    () => computedValues.defaultRole
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

  const roleFormConfig = useMemo(
    () => ({
      resolver: zodResolver(roleSchema),
      defaultValues: {
        role: computedValues.defaultRole,
      },
    }),
    [computedValues.defaultRole]
  );

  const nicknameForm = useForm<ProfileFormData>(nicknameFormConfig);
  const roleForm = useForm<RoleFormData>(roleFormConfig);

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

  const handleRoleUpdate = useCallback(() => {
    updateUserRole(selectedRole, {
      onSuccess: () => {
        navigate(URL_PATHS.USER);
      },
    });
  }, [updateUserRole, selectedRole, navigate]);

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
        <section>
          <h2 className="sr-only">닉네임 변경</h2>
          <Form {...nicknameForm}>
            <form
              onSubmit={nicknameForm.handleSubmit(handleNicknameUpdate)}
              className="flex flex-col gap-4"
            >
              <NicknameField
                control={nicknameForm.control}
                name="nickname"
                setValue={nicknameForm.setValue}
                label={
                  computedValues.isNewUser
                    ? "선생님이 사용하실 닉네임이에요!"
                    : "닉네임"
                }
              />
              {!computedValues.isNewUser && (
                <Button
                  type="submit"
                  disabled={
                    isNicknamePending || !nicknameForm.formState.isValid
                  }
                  variant="secondary"
                  font="md"
                >
                  닉네임 변경하기
                </Button>
              )}
            </form>
          </Form>
        </section>

        <section>
          <h2 className="sr-only">역할 변경</h2>
          <Form {...roleForm}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRoleUpdate();
              }}
              className="flex flex-col gap-4"
            >
              <RoleField
                selectedRole={selectedRole}
                onRoleChange={setSelectedRole}
                label={
                  computedValues.isNewUser
                    ? "해당되는 역할을 선택해주세요."
                    : "역할"
                }
              />
              {!computedValues.isNewUser && (
                <Button
                  type="submit"
                  disabled={isRolePending}
                  variant="secondary"
                  font="md"
                >
                  역할 변경하기
                </Button>
              )}
            </form>
          </Form>
        </section>

        {computedValues.isNewUser && (
          <Button
            type="button"
            onClick={handleNewUserSubmit}
            disabled={
              isNicknamePending ||
              isRolePending ||
              !nicknameForm.formState.isValid ||
              !nicknameForm.getValues("nickname")
            }
            variant="secondary"
            font="md"
            className="mt-2"
          >
            시작하기
          </Button>
        )}
      </div>

      {error && <ErrorMessage error={error.message} />}
    </PageLayout>
  );
}
