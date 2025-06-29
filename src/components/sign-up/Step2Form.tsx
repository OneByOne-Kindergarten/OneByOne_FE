import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Form } from "@/components/@shared/form";
import ErrorMessage from "@/components/@shared/form/error-message";
import Button from "@/components/@shared/buttons/base-button";
import { NicknameField } from "@/components/sign-up/NicknameField";
import { RoleField } from "@/components/sign-up/RoleField";
import { CommunityCategoryType } from "@/constants/community";

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

interface Step2FormProps {
  onSubmit: (data: Step2FormValues) => void;
  isLoading: boolean;
  error: string | null;
}

export function Step2Form({ onSubmit, isLoading, error }: Step2FormProps) {
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
          <NicknameField
            control={form.control}
            name="nickname"
            setValue={form.setValue}
          />
          <RoleField
            selectedRole={selectedRole}
            onRoleChange={handleRoleChange}
            error={form.formState.errors.role?.message}
          />
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
