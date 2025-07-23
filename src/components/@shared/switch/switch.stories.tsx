import { useState } from "react";

import {
  ColorSwatch,
  GuidelineGrid,
  Section,
  SpecCard,
  SpecGrid,
  SpecTable,
} from "@/components/@shared/layout/storybook-layout";

import { Switch } from "./index";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "스위치 컴포넌트",
      },
    },
  },
  argTypes: {
    checked: {
      description: "스위치 상태 (on/off)",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      description: "비활성화 상태",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    onCheckedChange: {
      description: "상태 변경 핸들러",
      action: "switch toggled",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveSwitch = ({
  initialChecked = false,
  ...props
}: {
  initialChecked?: boolean;
} & Omit<
  React.ComponentProps<typeof Switch>,
  "checked" | "onCheckedChange"
>) => {
  const [checked, setChecked] = useState(initialChecked);

  return <Switch {...props} checked={checked} onCheckedChange={setChecked} />;
};

export const Playground: Story = {
  render: (args) => (
    <InteractiveSwitch initialChecked={args.checked} disabled={args.disabled} />
  ),
  args: {
    checked: false,
    disabled: false,
  },
};

export const Specs: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <SpecGrid>
          <SpecTable
            title="Size"
            headers={["property", "value", "token"]}
            data={[
              ["width", "44px", "w-11"],
              ["height", "24px", "h-6"],
              ["thumb width", "20px", "w-5"],
              ["thumb height", "20px", "h-5"],
              ["border radius", "9999px", "rounded-full"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="Colors"
            headers={["state", "background", "thumb"]}
            data={[
              [
                "unchecked",
                <ColorSwatch color="bg-gray-200" label="gray-200" />,
                <ColorSwatch color="bg-white" label="white" />,
              ],
              [
                "checked",
                <ColorSwatch
                  color="bg-primary-normal01"
                  label="primary-normal01"
                />,
                <ColorSwatch color="bg-white" label="white" />,
              ],
              [
                "disabled",
                <ColorSwatch color="bg-gray-100" label="gray-100" />,
                <ColorSwatch color="bg-gray-300" label="gray-300" />,
              ],
            ]}
            codeColumns={[0]}
          />

          <SpecTable
            title="Animation"
            headers={["property", "duration", "easing"]}
            data={[
              ["transform", "150ms", "cubic-bezier(0.4, 0, 0.2, 1)"],
              ["background", "150ms", "ease-in-out"],
              ["thumb position", "150ms", "ease-in-out"],
            ]}
            codeColumns={[0, 1, 2]}
          />

          <SpecTable
            title="States"
            headers={["state", "appearance", "interaction"]}
            data={[
              ["unchecked", "회색 배경, 왼쪽 정렬", "클릭하여 활성화"],
              ["checked", "파란색 배경, 오른쪽 정렬", "클릭하여 비활성화"],
              ["disabled", "회색 처리", "클릭 불가능"],
              ["focus", "포커스 링 표시", "키보드 네비게이션"],
            ]}
            codeColumns={[0]}
          />
        </SpecGrid>

        <SpecCard title="Usage Guidelines">
          <GuidelineGrid
            columns={2}
            sections={[
              {
                title: "사용 시나리오",
                items: [
                  "기능 활성화/비활성화",
                  "알림 설정 (푸시, 이메일)",
                  "개인정보 공개 여부",
                  "앱 설정 (다크모드, 자동저장)",
                  "프로필 공개 범위 설정",
                ],
              },
              {
                title: "UX 가이드라인",
                items: [
                  "즉시 반영되는 설정에 사용",
                  "명확한 on/off 상태 표시",
                  "레이블과 함께 사용 권장",
                  "중요한 설정에는 확인 메시지 추가",
                  "그룹화하여 관련 설정 모음",
                ],
              },
              {
                title: "접근성",
                items: [
                  "키보드 네비게이션 지원",
                  "스크린 리더 지원 (aria-checked)",
                  "포커스 표시 명확",
                  "최소 터치 영역 44px",
                  "색상에 의존하지 않는 상태 표시",
                ],
              },
              {
                title: "성능",
                items: [
                  "Radix UI 기반 최적화",
                  "부드러운 애니메이션",
                  "최소한의 리렌더링",
                  "모바일 친화적 터치 처리",
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

export const Gallery: Story = {
  render: () => (
    <main className="flex flex-col gap-6">
      <Section title="Default">
        <InteractiveSwitch />
        <InteractiveSwitch initialChecked />
      </Section>
    </main>
  ),
  parameters: {
    docs: {
      description: {
        story: "옵션 별 컴포넌트 스타일 프리뷰",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Switch checked={false} />
        <span>Off</span>
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={true} />
        <span>On</span>
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={false} disabled />
        <span className="text-gray-400">Disabled (Off)</span>
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={true} disabled />
        <span className="text-gray-400">Disabled (On)</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "상태 별 컴포넌트 스타일 프리뷰",
      },
    },
  },
};

export const UseCases: Story = {
  render: () => {
    const SettingsPageDemo = () => {
      const [settings, setSettings] = useState({
        notifications: true,
        privacy: false,
        autoSave: true,
        sounds: false,
        location: true,
      });

      const handleSettingChange = (
        key: keyof typeof settings,
        value: boolean
      ) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
      };

      const settingItems = [
        {
          key: "notifications" as const,
          label: "알림",
          description: "새로운 메시지와 업데이트 알림",
        },
        {
          key: "privacy" as const,
          label: "개인정보 공개",
          description: "최근 근무 지역 공개 여부",
        },
        {
          key: "location" as const,
          label: "위치 서비스",
          description: "근처 유치원 검색을 위한 위치 정보",
        },
      ];

      return (
        <div className="w-80 space-y-4 rounded-lg border p-4">
          <h3 className="text-lg font-semibold">계정 설정</h3>

          <div className="space-y-4">
            {settingItems.map(({ key, label, description }) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-medium">{label}</div>
                    <div className="text-sm text-gray-500">{description}</div>
                  </div>
                  <Switch
                    checked={settings[key]}
                    onCheckedChange={(value) => handleSettingChange(key, value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return <SettingsPageDemo />;
  },
  parameters: {
    docs: {
      description: {
        story: "실제 설정 페이지에서의 사용 예시",
      },
    },
  },
};
