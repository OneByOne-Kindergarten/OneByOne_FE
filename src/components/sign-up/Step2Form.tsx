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
import Input from "@/components/@shared/form/input";
import ErrorMessage from "@/components/@shared/form/error-message";
import Button from "@/components/@shared/buttons/base-button";
import { SVG_PATHS } from "@/constants/assets-path";
import { CommunityCategoryType } from "@/constants/community";

// 닉네임, 회원 유형
const step2Schema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(8, "닉네임은 최대 8자까지 가능합니다."),
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
                <FormLabel>선생님이 사용하실 닉네임이에요!</FormLabel>
                <FormControl>
                  <Input
                    placeholder="닉네임을 입력해주세요."
                    error={!!fieldState.error}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>해당되는 역할을 선택해주세요.</FormLabel>
            <div className="flex w-full gap-3">
              <button
                type="button"
                onClick={() => handleRoleChange("TEACHER")}
                className={clsx(
                  "w-1/2 px-4 pt-5 pb-7 gap-3 flex flex-col text-left rounded-lg",
                  selectedRole === "TEACHER"
                    ? "bg-tertiary-1 text-primary-dark01 outline-1 outline outline-tertiary-3"
                    : "bg-primary-foreground text-primary-normal03"
                )}
              >
                <img
                  src={SVG_PATHS.CHARACTER.chicken}
                  alt="닭 캐릭터"
                  width={56}
                  height={56}
                  className="ml-auto"
                />
                <div className="flex flex-col">
                  <strong className="text-sm font-semibold">교사예요.</strong>
                  <span className="text-xxs text-pretty">
                    교사 경력을 인증할 수 있어요!
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange("PROSPECTIVE_TEACHER")}
                className={clsx(
                  "w-1/2 px-4 pt-5 pb-7 gap-3 flex flex-col text-left rounded-lg",
                  selectedRole === "PROSPECTIVE_TEACHER"
                    ? "bg-tertiary-1 text-primary-dark01 outline-1 outline outline-tertiary-3"
                    : "bg-primary-foreground text-primary-normal03"
                )}
              >
                <img
                  src={SVG_PATHS.CHARACTER.chick}
                  alt="병아리 캐릭터"
                  width={56}
                  height={56}
                  className="ml-auto"
                />
                <div className="flex flex-col">
                  <strong className="text-sm font-semibold">
                    예비교사예요.
                  </strong>
                  <span className="text-xxs">
                    교사를 꿈꾸는, 아직 경력이 <br />
                    없는 사람이에요!
                  </span>
                </div>
              </button>
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
