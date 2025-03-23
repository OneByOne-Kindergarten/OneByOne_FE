import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/@shared/form";
import Input from "@/components/@shared/form/input";
import ToggleInput from "@/components/@shared/form/toggle-input";
import Button from "@/components/@shared/buttons/button";
import PageLayout from "@/components/@shared/layout/page-layout";
import { URL } from "@/constants/url";

export default function SignIn() {
  const form = useForm();

  return (
    <PageLayout
      title="원바원 | 로그인"
      headerTitle=" "
      headerHasBorder={false}
      currentPath={URL.HOME}
      isGlobalNavBar={false}
      mainClassName="mt-16 flex flex-col gap-16"
      wrapperBg="white"
    >
      <h1 className="text-center text-lg">이메일로 로그인</h1>
      <section className="px-5 flex flex-col gap-9">
        <Form {...form}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="이메일을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <ToggleInput
                      placeholder="비밀번호를 입력해주세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" size="lg">
            로그인
          </Button>
        </Form>
      </section>
      <section className="flex flex-col gap-2 items-center text-xs">
        <div className="flex gap-2">
          <p className="text-primary-dark03">비밀번호를 잊으셨나요?</p>
          <Link to="#" className="text-tertiary-3 font-semibold">
            비밀번호 찾기
          </Link>
        </div>
        <div className="flex gap-2">
          <p className="text-primary-dark03">아직 회원이 아니신가요?</p>
          <Link to={URL.SIGNUP} className="text-tertiary-3 font-semibold">
            회원가입
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
