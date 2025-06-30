import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateNickname, useUpdateUserRole } from "@/hooks/useAuth";
import { useAtom } from "jotai";
import { userAtom } from "@/stores/userStore";
import PageLayout from "@/components/@shared/layout/page-layout";
import { URL_PATHS } from "@/constants/url-path";
import Button from "@/components/@shared/buttons/base-button";
import { Form } from "@/components/@shared/form";
import { NicknameField } from "@/components/sign-up/NicknameField";
import { RoleField } from "@/components/sign-up/RoleField";
import ErrorMessage from "@/components/@shared/form/error-message";
import { CommunityCategoryType } from "@/constants/community";

const profileSchema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(10, "닉네임은 최대 10자까지 가능합니다."),
});

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

  const [selectedRole, setSelectedRole] = useState<CommunityCategoryType>(
    () => {
      if (!user?.role || user.role === "GENERAL" || user.role === "ADMIN") {
        return "TEACHER";
      }
      return user.role as CommunityCategoryType;
    }
  );

  const nicknameForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nickname: user?.nickname || "",
    },
  });

  const roleForm = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: (() => {
        if (!user?.role || user.role === "GENERAL" || user.role === "ADMIN") {
          return "TEACHER";
        }
        return user.role as CommunityCategoryType;
      })(),
    },
  });

  console.log(user);

  const handleNicknameUpdate = (data: ProfileFormData) => {
    updateNickname(data.nickname, {
      onSuccess: () => {
        navigate(URL_PATHS.USER);
      },
    });
  };

  const handleRoleUpdate = () => {
    updateUserRole(selectedRole, {
      onSuccess: () => {
        navigate(URL_PATHS.USER);
      },
    });
  };

  // 새로운 사용자용 통합 처리 함수
  const handleNewUserSubmit = () => {
    // 닉네임 유효성 검사
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
  };

  const error = nicknameError || roleError;
  const isNewUser = !user?.role || user.role === "GENERAL";

  return (
    <PageLayout
      title="원바원 | 프로필"
      description="사용자 프로필 수정"
      headerTitle={isNewUser ? undefined : "프로필 수정"}
      headerLogo={isNewUser ? undefined : true}
      currentPath={URL_PATHS.USER}
      wrapperBg="white"
      mainClassName={
        isNewUser
          ? "flex flex-col my-auto px-5"
          : "flex flex-col pb-5 mb-24 mt-14 pt-8 px-5"
      }
      isGlobalNavBar={!isNewUser}
    >
      {isNewUser && (
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
                label={isNewUser ? "선생님이 사용하실 닉네임이에요!" : "닉네임"}
              />
              {!isNewUser && (
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
                label={isNewUser ? "해당되는 역할을 선택해주세요." : "역할"}
              />
              {!isNewUser && (
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

        {isNewUser && (
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
