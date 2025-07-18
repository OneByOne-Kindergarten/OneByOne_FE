import { action } from "@storybook/addon-actions";
import { useForm } from "react-hook-form";

import Button from "@/components/@shared/buttons/base-button";
import { Checkbox } from "@/components/@shared/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/@shared/form";
import ErrorMessage from "@/components/@shared/form/error-message";
import Input from "@/components/@shared/form/input";
import Label from "@/components/@shared/form/label";
import Textarea from "@/components/@shared/form/textarea";
import ToggleInput from "@/components/@shared/form/toggle-input";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Form",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
React Hook Form을 사용한 Radix UI 기반 폼 컴포넌트입니다.

**구성요소:**
- Form: React Hook Form 통합
- Input: 기본 텍스트 입력
- Textarea: 긴 텍스트 입력
- ToggleInput: 가시성 토글 포함
- Label: 접근성을 고려한 라벨
- ErrorMessage

**기능:**
- 실시간 유효성 검사
- 접근성 지원 (aria-label, aria-describedby)
- 다양한 스타일 변형
- 반응형 디자인
        `,
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

// Interactive Default Form
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

export const Interactive: Story = {
  render: () => <InteractiveFormDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "실제로 입력하고 제출할 수 있는 인터랙티브 폼입니다. 모든 유효성 검사와 에러 메시지가 동작합니다.",
      },
    },
  },
};

// Props별 컴포넌트 showcase
export const InputVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Input 컴포넌트 변형</h3>

      <div className="space-y-4">
        <div>
          <Label>Default Variant</Label>
          <Input placeholder="기본 스타일" />
        </div>

        <div>
          <Label>Outline Variant</Label>
          <Input variant="outline" placeholder="아웃라인 스타일" />
        </div>

        <div>
          <Label>Small Size</Label>
          <Input inputSize="sm" placeholder="작은 크기" />
        </div>

        <div>
          <Label>Extra Small Size</Label>
          <Input inputSize="xs" placeholder="아주 작은 크기" />
        </div>

        <div>
          <Label>Error State</Label>
          <Input error placeholder="에러 상태" />
          <ErrorMessage error="필수 입력 항목입니다" />
        </div>

        <div>
          <Label>Different Font Sizes</Label>
          <div className="space-y-2">
            <Input font="xs" placeholder="Extra Small 폰트" />
            <Input font="sm" placeholder="Small 폰트" />
            <Input font="md" placeholder="Medium 폰트" />
            <Input font="lg" placeholder="Large 폰트" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Input 컴포넌트의 다양한 props와 스타일 변형을 보여줍니다.",
      },
    },
  },
};

export const TextareaVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Textarea 컴포넌트 변형</h3>

      <div className="space-y-4">
        <div>
          <Label>Fixed Size (기본)</Label>
          <Textarea placeholder="고정 높이 텍스트 영역" />
        </div>

        <div>
          <Label>Auto Expand</Label>
          <Textarea size="auto" placeholder="포커스 시 확장되는 텍스트 영역" />
        </div>

        <div>
          <Label>Small Padding</Label>
          <Textarea padding="sm" placeholder="작은 패딩" />
        </div>

        <div>
          <Label>Extra Small Padding</Label>
          <Textarea padding="xs" placeholder="아주 작은 패딩" />
        </div>

        <div>
          <Label>Error State</Label>
          <Textarea error placeholder="에러 상태" />
          <ErrorMessage error="내용을 입력해주세요" />
        </div>

        <div>
          <Label>Different Font Sizes</Label>
          <div className="space-y-2">
            <Textarea font="sm" placeholder="Small 폰트" />
            <Textarea font="md" placeholder="Medium 폰트" />
            <Textarea font="lg" placeholder="Large 폰트" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Textarea 컴포넌트의 다양한 props와 스타일 변형을 보여줍니다.",
      },
    },
  },
};

export const ToggleInputVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">ToggleInput (비밀번호)</h3>

      <div className="space-y-4">
        <div>
          <Label>기본 비밀번호 입력</Label>
          <ToggleInput placeholder="비밀번호를 입력하세요" />
        </div>

        <div>
          <Label>에러 상태</Label>
          <ToggleInput error placeholder="비밀번호를 입력하세요" />
          <ErrorMessage error="비밀번호는 8자 이상이어야 합니다" />
        </div>

        <div>
          <Label>커스텀 스타일</Label>
          <ToggleInput
            placeholder="커스텀 스타일 비밀번호"
            className="border-2 border-blue-200"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "비밀번호 표시/숨김 토글 기능이 있는 ToggleInput 컴포넌트입니다.",
      },
    },
  },
};
