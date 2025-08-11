import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

import NicknameField from "@/features/form/ui/fields/NicknameField";
import Button from "@/shared/ui/buttons/base-button";
import { Form } from "@/shared/ui/form";
import { profileSchema } from "@/shared/utils/validationSchemas";

interface NicknameSectionProps {
  defaultNickname: string;
  isNewUser: boolean;
  isPending: boolean;
  onSubmit: (nickname: string) => void;
}

type ProfileFormData = { nickname: string };

export default function NicknameSection({
  defaultNickname,
  isNewUser,
  isPending,
  onSubmit,
}: NicknameSectionProps) {
  const nicknameFormConfig = useMemo(
    () => ({
      resolver: zodResolver(profileSchema),
      mode: "onChange" as const,
      reValidateMode: "onChange" as const,
      defaultValues: { nickname: defaultNickname },
    }),
    [defaultNickname]
  );

  const nicknameForm = useForm<ProfileFormData>(nicknameFormConfig);

  return (
    <section>
      <h2 className="sr-only">닉네임 변경</h2>
      <Form {...nicknameForm}>
        <form
          onSubmit={nicknameForm.handleSubmit((data) =>
            onSubmit(data.nickname)
          )}
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
              disabled={isPending || !nicknameForm.formState.isValid}
              variant="secondary"
              font="md"
            >
              닉네임 변경하기
            </Button>
          )}
        </form>
      </Form>
    </section>
  );
}
