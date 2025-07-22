import {
  GuidelineGrid,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/components/@shared/layout/storybook-layout";

import ErrorMessage from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Form/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "에러 메시지 컴포넌트",
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
      description: "에러 메시지 텍스트",
      control: "text",
    },
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    error: "이 필드는 필수입니다",
  },
};

export const Specs: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <SpecGrid>
          <SpecTable
            title="Props"
            headers={["prop", "type", "description"]}
            data={[["error", "string", "에러 메시지 텍스트 (필수)"]]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Layout"
            headers={["property", "value", "token"]}
            data={[
              ["text color", "red-500", "text-red-500"],
              ["font size", "12px", "text-xs"],
              ["line height", "16px", "leading-4"],
              ["text align", "center", "text-center"],
              ["margin", "0", "m-0"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Typography"
            headers={["property", "value", "purpose"]}
            data={[
              ["font weight", "400", "일반 텍스트 가중치"],
              ["text transform", "none", "원본 텍스트 유지"],
              ["letter spacing", "normal", "기본 자간"],
              ["word break", "break-word", "긴 텍스트 줄바꿈"],
            ]}
            codeColumns={[0, 1]}
          />

          <SpecTable
            title="Accessibility"
            headers={["feature", "implementation", "benefit"]}
            data={[
              ["semantic HTML", "p 태그 사용", "스크린 리더 인식"],
              ["color contrast", "빨간색 (#ef4444)", "시각적 구분"],
              ["font size", "12px 이상", "가독성 확보"],
              ["clear language", "명확한 메시지", "사용자 이해도"],
            ]}
            codeColumns={[0, 1]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "사용 시나리오",
                items: [
                  "폼 유효성 검사 실패",
                  "입력 형식 오류",
                  "필수 필드 미입력",
                  "중복 데이터 검증 실패",
                  "서버 유효성 검사 오류",
                ],
              },
              {
                title: "메시지 작성 가이드라인",
                items: [
                  { label: "명확성", description: "구체적인 오류 내용 설명" },
                  { label: "행동 유도", description: "해결 방법 제시" },
                  { label: "친절한 톤", description: "비난보다는 안내" },
                  { label: "간결성", description: "핵심만 전달" },
                ],
              },
              {
                title: "표시 시점",
                items: [
                  "실시간 유효성 검사 (onBlur)",
                  "폼 제출 시 검증 결과",
                  "서버 응답 후 오류 표시",
                  "입력 중 즉시 피드백 (실시간)",
                  "포커스 이동 시 검증",
                ],
              },
              {
                title: "접근성 & UX",
                items: [
                  "충분한 색상 대비 확보",
                  "스크린 리더 호환성",
                  "명확한 위치 (입력 필드 하단)",
                  "일관된 스타일링",
                  "애니메이션 효과 (선택사항)",
                ],
              },
            ]}
          />
        </SpecCard>
      </div>
    </div>
  ),
  args: {
    error: "이 필드는 필수입니다",
  },
  parameters: {
    docs: {
      description: {
        story: "컴포넌트의 상세 스펙과 사용 가이드라인",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">필수 필드 오류</h3>
        <ErrorMessage error="이 필드는 필수입니다" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">형식 오류</h3>
        <ErrorMessage error="올바른 이메일 형식을 입력해주세요" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">길이 제한 오류</h3>
        <ErrorMessage error="비밀번호는 8자 이상이어야 합니다" />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">중복 검증 오류</h3>
        <ErrorMessage error="이미 사용 중인 이메일입니다" />
      </div>
    </div>
  ),
  args: {
    error: "이 필드는 필수입니다",
  },
  parameters: {
    docs: {
      description: {
        story: "상태 별 컴포넌트 스타일 프리뷰",
      },
    },
  },
};

export const UseCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">회원가입 폼</h3>
        <div className="space-y-4 rounded-lg border p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">이메일</label>
            <input
              type="email"
              className="w-full rounded-md border border-red-500 px-3 py-2"
              placeholder="이메일 주소"
              defaultValue="invalid-email"
            />
            <ErrorMessage error="올바른 이메일 형식을 입력해주세요" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-red-500 px-3 py-2"
              placeholder="비밀번호"
              defaultValue="123"
            />
            <ErrorMessage error="비밀번호는 8자 이상이어야 합니다" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">닉네임</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              placeholder="닉네임"
              defaultValue="올바른닉네임"
            />
            <p className="text-xs text-gray-500">에러가 없는 정상 상태</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">로그인 폼</h3>
        <div className="space-y-4 rounded-lg border p-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">아이디</label>
            <input
              type="text"
              className="w-full rounded-md border border-red-500 px-3 py-2"
              placeholder="아이디"
              defaultValue=""
            />
            <ErrorMessage error="아이디를 입력해주세요" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              className="w-full rounded-md border border-red-500 px-3 py-2"
              placeholder="비밀번호"
              defaultValue="wrongpassword"
            />
            <ErrorMessage error="비밀번호를 입력해주세요" />
          </div>
        </div>
      </div>
    </div>
  ),
  args: {
    error: "이 필드는 필수입니다",
  },
  parameters: {
    docs: {
      description: {
        story: "실제 애플리케이션에서의 사용 예시",
      },
    },
  },
};
