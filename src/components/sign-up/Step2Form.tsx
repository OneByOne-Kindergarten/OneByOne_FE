import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { clsx } from "clsx";
import * as z from "zod";

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/@shared/form";
import { useRandomNickname } from "@/hooks/useRandomNickname";
import Input from "@/components/@shared/form/input";
import ErrorMessage from "@/components/@shared/form/error-message";
import Button from "@/components/@shared/buttons/base-button";
import RoleButton from "@/components/sign-up/RoleButton";
import { SVG_PATHS } from "@/constants/assets-path";
import { CommunityCategoryType } from "@/constants/community";

// 닉네임, 회원 유형 검증
const step2Schema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(10, "닉네임은 최대 10자까지 가능합니다."),
  role: z.enum(["TEACHER", "PROSPECTIVE_TEACHER"], {
    errorMap: () => ({ message: "회원 유형을 선택해주세요." }),
  }),
});

export type Step2FormValues = z.infer<typeof step2Schema>;

export function Step2Form({
  onSubmit,
  isLoading,
  error,
}: {
  onSubmit: (data: Step2FormValues) => void;
  isLoading: boolean;
  error: string | null;
}) {
  const form = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      nickname: "",
      role: "TEACHER",
    },
    mode: "onChange",
  });
  const [selectedRole, setSelectedRole] =
    useState<CommunityCategoryType>("TEACHER");

  const { isRandomNickname, handleRandomNickname, handleManualNickname } =
    useRandomNickname({
      setValue: form.setValue,
    });

  const handleRoleChange = (role: CommunityCategoryType) => {
    setSelectedRole(role);
    form.setValue("role", role, { shouldValidate: true });
  };

  const handleFormSubmit = form.handleSubmit((data) => {
    onSubmit({
      ...data,
      role: selectedRole,
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-7">
          <FormField
            control={form.control}
            name="nickname"
            render={({ field, fieldState }) => (
              <FormItem>
                <div className="relative flex justify-between items-center">
                  <FormLabel className="font-semibold text-primary-dark01">
                    선생님이 사용하실 닉네임이에요!
                  </FormLabel>
                  <Button
                    type="button"
                    variant="transparent_gray"
                    font="sm"
                    size="sm"
                    onClick={
                      isRandomNickname
                        ? handleManualNickname
                        : handleRandomNickname
                    }
                  >
                    <p>{isRandomNickname ? "직접 설정" : "랜덤 설정"}</p>
                  </Button>
                  {isRandomNickname && (
                    <img
                      src={SVG_PATHS.CHECK}
                      width={26}
                      height={26}
                      className="absolute top-10 right-3"
                    />
                  )}
                </div>
                <FormControl>
                  <Input
                    className={clsx(isRandomNickname && "border-tertiary-3")}
                    placeholder="닉네임을 입력해주세요."
                    error={!!fieldState.error}
                    {...field}
                  />
                </FormControl>
                {isRandomNickname && (
                  <p className="text-xs text-tertiary-3 mt-1">
                    안전한 커뮤니티 운영을 위한 닉네임이 자동으로 만들어졌어요
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel className="font-semibold text-primary-dark01">
              해당되는 역할을 선택해주세요.
            </FormLabel>
            <div className="flex w-full gap-3">
              <RoleButton
                role="TEACHER"
                isSelected={selectedRole === "TEACHER"}
                onClick={() => handleRoleChange("TEACHER")}
                character={SVG_PATHS.CHARACTER.chicken}
                title="교사예요."
                description="교사 경력을 인증할 수 있어요!"
              />
              <RoleButton
                role="PROSPECTIVE_TEACHER"
                isSelected={selectedRole === "PROSPECTIVE_TEACHER"}
                onClick={() => handleRoleChange("PROSPECTIVE_TEACHER")}
                character={SVG_PATHS.CHARACTER.chick}
                title="예비교사예요."
                description="교사를 꿈꾸는, 아직 경력이 <br />
                    없는 사람이에요!"
              />
            </div>
            {form.formState.errors.role && (
              <FormMessage>{form.formState.errors.role.message}</FormMessage>
            )}
          </FormItem>
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            type="submit"
            size="lg"
            font="md"
            className="flex-1"
            disabled={
              isLoading ||
              !form.formState.isValid ||
              Object.keys(form.formState.errors).length > 0
            }
          >
            시작하기
          </Button>
        </div>

        {error && <ErrorMessage error={error} />}
      </form>
    </Form>
  );
}
