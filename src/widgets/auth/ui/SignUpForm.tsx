import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import NicknameField from "@/features/form/ui/fields/NicknameField";
import PolicyField from "@/features/form/ui/fields/PolicyField";
import RoleField from "@/features/form/ui/fields/RoleField";
import SubmitButton from "@/features/form/ui/SubmitButton";
import { Form } from "@/shared/ui/form";
import { CommunityCategoryType } from "@/widgets/community-feed/lib/category";

const step4Schema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(10, "닉네임은 최대 10자까지 가능합니다."),
  role: z.enum(["TEACHER", "PROSPECTIVE_TEACHER"], {
    errorMap: () => ({ message: "회원 유형을 선택해주세요." }),
  }),
  termsOfService: z.boolean().refine((value) => value === true, {
    message: "이용약관에 동의해주세요.",
  }),
  privacyPolicy: z.boolean().refine((value) => value === true, {
    message: "개인정보 수집 이용에 동의해주세요.",
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
    defaultValues: {
      nickname: "",
      role: "TEACHER",
      termsOfService: false,
      privacyPolicy: false,
    },
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
          <PolicyField control={form.control} errors={form.formState.errors} />
        </div>
        <SubmitButton
          label="시작하기"
          disabled={isLoading || !form.formState.isValid}
          isLoading={isLoading}
        />
      </form>
    </Form>
  );
}
