import { action } from "@storybook/addon-actions";
import { useState } from "react";

import {
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/common/ui/layout/storybook-layout";

import ToggleInput from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Form/ToggleInput",
  component: ToggleInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "표시/숨김 토글 기능이 내장된 입력 컴포넌트",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md space-y-2 p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
    iconClassName: {
      description: "아이콘 커스텀 클래스",
      control: "text",
    },
  },
} satisfies Meta<typeof ToggleInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const PlaygroundDemo = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    action("값 변경")(e.target.value);
    action("길이")(e.target.value.length);
  };

  const handleFocus = () => {
    action("포커스")();
  };

  const handleBlur = () => {
    action("블러")();
  };

  return (
    <ToggleInput
      placeholder="입력해보세요"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export const Playground: Story = {
  render: () => <PlaygroundDemo />,
  args: {},
};

export const Specs: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <SpecGrid>
          <SpecTable
            title="Props"
            headers={["prop", "type", "description"]}
            data={[
              ["placeholder", "string", "플레이스홀더 텍스트 (선택)"],
              ["error", "boolean", "에러 상태 표시 (선택)"],
              ["disabled", "boolean", "비활성화 상태 (선택)"],
              ["iconClassName", "string", "아이콘 커스텀 클래스 (선택)"],
              ["onChange", "function", "값 변경 핸들러 (선택)"],
              ["onFocus", "function", "포커스 핸들러 (선택)"],
              ["onBlur", "function", "블러 핸들러 (선택)"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Layout"
            headers={["property", "value", "token"]}
            data={[
              ["height", "44px", "h-11"],
              ["padding", "20px", "p-5"],
              ["padding-right", "48px", "pr-12"],
              ["border radius", "8px", "rounded-lg"],
              ["background", "primary-foreground", "bg-primary-foreground"],
              ["text size", "14px", "text-sm"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Toggle Features"
            headers={["feature", "behavior", "accessibility"]}
            data={[
              [
                "visibility toggle",
                "클릭으로 표시/숨김 전환",
                "aria-label 지원",
              ],
              ["icon position", "우측 상단 절대 위치", "버튼 역할"],
              ["password filter", "한글 입력 자동 차단", "IME 조합 처리"],
              ["focus state", "파란색 outline", "키보드 접근 가능"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="States"
            headers={["state", "appearance", "interaction"]}
            data={[
              ["default", "일반 테두리", "입력 및 토글 가능"],
              ["focus", "파란색 outline", "키보드 입력 활성"],
              ["error", "빨간색 테두리", "오류 상태 표시"],
              ["disabled", "회색 처리", "입력 및 토글 불가"],
            ]}
            codeColumns={[0]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "토글 기능 조작",
                items: [
                  "우측 눈 아이콘 클릭으로 표시/숨김 전환",
                  "표시 상태: 눈 뜬 아이콘, 텍스트 보임",
                  "숨김 상태: 눈 감은 아이콘, 마스킹 처리",
                  "키보드 Tab으로 토글 버튼 접근",
                  "Space/Enter로 토글 상태 변경",
                ],
              },
              {
                title: "입력 필터링",
                items: [
                  "한글 입력 자동 차단 (비밀번호 정책)",
                  "IME 조합 중 실시간 처리",
                  "영문, 숫자, 특수문자만 허용",
                  "복사/붙여넣기 시에도 필터링 적용",
                  "조합 완료 후 즉시 검증",
                ],
              },
              {
                title: "사용 시나리오",
                items: [
                  "회원가입 비밀번호 입력",
                  "로그인 비밀번호 입력",
                  "비밀번호 변경 폼",
                  "비밀번호 확인 입력",
                  "보안이 필요한 텍스트 입력",
                ],
              },
              {
                title: "접근성 & UX",
                items: [
                  "스크린 리더 지원 (aria-label)",
                  "키보드 네비게이션 완전 지원",
                  "충분한 터치 영역 (44px 이상)",
                  "명확한 상태 변화 피드백",
                  "에러 상태 시각적 표시",
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
