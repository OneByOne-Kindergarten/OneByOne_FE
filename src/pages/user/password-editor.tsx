import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { URL_PATHS } from "@/common/constants/url-path";
import Button from "@/common/ui/buttons/base-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/ui/form";
import ToggleInput from "@/common/ui/form/toggle-input";
import PageLayout from "@/common/ui/layout/page-layout";
import { passwordChangeSchema } from "@/common/utils/validationSchemas";
import { useUpdatePassword } from "@/entities/user/hooks";

type PasswordFormData = z.infer<typeof passwordChangeSchema>;

export default function PasswordEditorPage() {
  const { mutate: updatePassword, isPending } = useUpdatePassword();

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = (data: PasswordFormData) => {
    updatePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  const isFormValid =
    form.formState.isValid &&
    form.getValues("currentPassword") !== "" &&
    form.getValues("newPassword") !== "";

  return (
    <PageLayout
      title="원바원 | 비밀번호 변경"
      description="사용자 비밀번호 변경"
      headerTitle="비밀번호 변경"
      currentPath={URL_PATHS.USER}
      wrapperBg="white"
      mainClassName="flex flex-col px-5 mt-14"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-12 py-7"
        >
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-primary-dark01">
                    현재 비밀번호
                  </FormLabel>
                  <FormControl>
                    <ToggleInput
                      placeholder="현재 비밀번호를 입력해주세요"
                      error={!!fieldState.error}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-primary-dark01">
                    새 비밀번호
                  </FormLabel>
                  <FormControl>
                    <ToggleInput
                      placeholder="새 비밀번호를 입력해주세요"
                      error={!!fieldState.error}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending || !isFormValid}
            className="w-full"
            variant="secondary"
          >
            변경하기
          </Button>
        </form>
      </Form>
    </PageLayout>
  );
}
