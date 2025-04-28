import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userAtom } from "@/stores/userStore";
import { useUpdateNickname } from "@/hooks/useAuth";
import PageLayout from "@/components/@shared/layout/page-layout";
import { URL_PATHS } from "@/constants/url-path";
import Button from "@/components/@shared/buttons/base-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/@shared/form";
import Input from "@/components/@shared/form/input";

// 닉네임 유효성 검사 스키마
const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(8, "닉네임은 최대 8자까지 가능합니다.")
    .regex(
      /^[가-힣a-zA-Z0-9]+$/,
      "닉네임은 한글, 영문, 숫자만 사용 가능합니다."
    ),
});

type NicknameFormData = z.infer<typeof nicknameSchema>;

export default function NicknameEditorPage() {
  const [user] = useAtom(userAtom);
  const navigate = useNavigate();
  const { mutate: updateNickname, isPending } = useUpdateNickname();

  const form = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: {
      nickname: user?.nickname || "",
    },
  });

  const onSubmit = (data: NicknameFormData) => {
    updateNickname(data.nickname, {
      onSuccess: () => {
        navigate(URL_PATHS.USER);
      },
    });
  };

  return (
    <PageLayout
      title="원바원 | 닉네임 수정"
      description="사용자 닉네임 수정"
      headerTitle="닉네임 수정"
      currentPath={URL_PATHS.USER}
      wrapperBg="white"
      mainClassName="flex flex-col px-5"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-12 py-7"
        >
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-primary-dark01 font-semibold">
                    닉네임
                  </FormLabel>
                  <span className="text-primary-normal02 font-semibold text-xs">
                    *8자 이내
                  </span>
                </div>
                <FormControl>
                  <Input
                    inputSize="xs"
                    placeholder="변경할 닉네임을 입력해주세요"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            저장하기
          </Button>
        </form>
      </Form>
    </PageLayout>
  );
}
