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
import Button from "@/components/@shared/buttons/base-button";
import PageLayout from "@/components/@shared/layout/page-layout";
import { URL } from "@/constants/url";

export default function SignUp() {
  const form = useForm();

  return (
    <PageLayout
      title="원바원 | 회원가입"
      currentPath={URL.HOME}
      headerTitle=" "
      headerHasBorder={false}
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <ToggleInput
                      placeholder="비밀번호를 다시 한번 입력해주세요."
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
          <p className="text-primary-dark03">이미 회원이신가요?</p>
          <Link to={URL.SIGNIN} className="text-tertiary-3 font-semibold">
            로그인
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
