import { action } from "@storybook/addon-actions";
import { useForm } from "react-hook-form";

import Button from "@/shared/ui/buttons/base-button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import Input from "@/shared/ui/form/input";
import ToggleInput from "@/shared/ui/form/toggle-input";
import {
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/shared/ui/layout/storybook-layout";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Form",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "React Hook Form 기반 폼 컴포넌트",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg rounded-lg border bg-white p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const InteractiveFormDemo = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
      bio: "",
      agreeTerms: false,
    },
  });

  const onSubmit = (data: Record<string, unknown>) => {
    action("폼 제출")(data);
    alert("폼 제출 성공\n콘솔을 확인해주세요.");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-primary-dark01">회원가입</h2>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "올바른 이메일 형식을 입력해주세요",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@domain.com"
                      {...field}
                      error={!!form.formState.errors.email}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상이어야 합니다",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호*</FormLabel>
                  <FormControl>
                    <ToggleInput
                      placeholder="8자 이상 입력해주세요"
                      {...field}
                      error={!!form.formState.errors.password}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              rules={{
                required: "비밀번호를 다시 입력해주세요",
                validate: (value) =>
                  value === form.watch("password") ||
                  "비밀번호가 일치하지 않습니다",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인*</FormLabel>
                  <FormControl>
                    <ToggleInput
                      placeholder="비밀번호를 다시 입력해주세요"
                      {...field}
                      error={!!form.formState.errors.confirmPassword}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agreeTerms"
              rules={{
                required: "이용약관에 동의해주세요",
              }}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-xs">
                      이용약관 및 개인정보처리방침에 동의합니다
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            시작하기
          </Button>
        </form>
      </Form>

      <div className="space-y-1 text-xs text-gray-500">
        <p>• 유효성 검사가 실시간으로 동작합니다.</p>
        <p>• Actions 패널에서 제출 데이터를 확인할 수 있습니다.</p>
      </div>
    </div>
  );
};

export const Playground: Story = {
  render: () => <InteractiveFormDemo />,
};

export const Specs: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <SpecGrid>
          <SpecTable
            title="Component Structure"
            headers={["component", "purpose", "required"]}
            data={[
              ["Form", "React Hook Form Provider", "Yes"],
              ["FormField", "필드 래퍼 + 검증", "Yes"],
              ["FormItem", "필드 컨테이너", "Yes"],
              ["FormLabel", "접근성 라벨", "Yes"],
              ["FormControl", "입력 컨트롤 래퍼", "Yes"],
              ["FormMessage", "에러 메시지 표시", "No"],
            ]}
            codeColumns={[0, 2]}
          />
          <SpecTable
            title="Validation Types"
            headers={["rule", "usage", "example"]}
            data={[
              ["required", "필수 입력", "required: '필수 필드입니다'"],
              [
                "minLength",
                "최소 길이",
                "minLength: { value: 8, message: '8자 이상' }",
              ],
              [
                "maxLength",
                "최대 길이",
                "maxLength: { value: 50, message: '50자 이하' }",
              ],
              [
                "pattern",
                "정규식 검증",
                "pattern: { value: /regex/, message: 'error' }",
              ],
              [
                "validate",
                "커스텀 검증",
                "validate: (value) => condition || 'error'",
              ],
            ]}
            codeColumns={[0, 2]}
          />
          <SpecTable
            title="Layout"
            headers={["property", "value", "purpose"]}
            data={[
              ["form spacing", "space-y-8", "폼 요소간 간격"],
              ["field spacing", "space-y-3", "개별 필드간 간격"],
              ["label margin", "mb-2", "라벨과 입력 사이 간격"],
              ["error margin", "mt-1", "에러 메시지 위 간격"],
            ]}
            codeColumns={[0, 1]}
          />
          <SpecTable
            title="Accessibility"
            headers={["feature", "implementation", "purpose"]}
            data={[
              ["Label Association", "id + htmlFor", "스크린 리더 지원"],
              ["Error Description", "aria-describedby", "에러 메시지 연결"],
              ["Required Fields", "aria-required", "필수 필드 표시"],
              ["Invalid State", "aria-invalid", "검증 실패 상태"],
            ]}
            codeColumns={[0, 1]}
          />
        </SpecGrid>
        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "폼 구조 설계",
                items: [
                  "논리적 순서로 필드 배치",
                  "관련 필드들을 그룹화",
                  "필수/선택 필드 명확히 구분",
                  "진행 단계가 긴 경우 단계 분할",
                  "제출 버튼을 폼 하단에 배치",
                ],
              },
              {
                title: "검증 전략",
                items: [
                  "실시간 검증으로 즉각적 피드백",
                  "명확하고 도움이 되는 에러 메시지",
                  "성공 상태도 적절히 표시",
                  "서버 검증과 클라이언트 검증 병행",
                  "검증 실패 시 포커스 이동",
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "회원가입 (이메일, 비밀번호, 프로필)",
                  "로그인 (아이디, 비밀번호)",
                  "게시글 작성 (제목, 내용, 카테고리)",
                  "댓글 작성 (내용)",
                  "설정 변경 (알림, 프로필 정보)",
                ],
              },
              {
                title: "UX 최적화",
                items: [
                  "자동완성 속성 활용",
                  "적절한 키보드 타입 설정",
                  "탭 순서 최적화",
                  "모바일에서 입력 편의성 고려",
                  "로딩 상태 표시",
                ],
              },
            ]}
          />
        </SpecCard>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "컴포넌트의 상세 스펙과 사용 가이드라인",
      },
    },
  },
};
