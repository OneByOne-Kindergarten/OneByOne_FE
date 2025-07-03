import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Button from "@/components/@shared/buttons/base-button";
import { Form } from "@/components/@shared/form";
import { NicknameField } from "@/components/sign-up/NicknameField";
import { RoleField } from "@/components/sign-up/RoleField";
import { CommunityCategoryType } from "@/constants/community";

const step4Schema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(10, "닉네임은 최대 10자까지 가능합니다."),
  role: z.enum(["TEACHER", "PROSPECTIVE_TEACHER"], {
    errorMap: () => ({ message: "회원 유형을 선택해주세요." }),
  }),
});

export type UserInfoFormValues = z.infer<typeof step4Schema>;

interface UserInfoFormProps {
  onSubmit: (data: UserInfoFormValues) => void;
  isLoading: boolean;
}

export function UserInfoForm({ onSubmit, isLoading }: UserInfoFormProps) {
  const form = useForm<UserInfoFormValues>({
    resolver: zodResolver(step4Schema),
    defaultValues: { nickname: "", role: "TEACHER" },
    mode: "onChange",
  });

  const [selectedRole, setSelectedRole] =
    useState<CommunityCategoryType>("TEACHER");

  const handleRoleChange = (role: CommunityCategoryType) => {
    setSelectedRole(role);
    form.setValue("role", role, { shouldValidate: true });
  };

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit({ ...data, role: selectedRole });
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
        <Button
          variant="secondary"
          type="submit"
          size="lg"
          font="md"
          disabled={isLoading || !form.formState.isValid}
        >
          시작하기
        </Button>
      </form>
    </Form>
  );
}
