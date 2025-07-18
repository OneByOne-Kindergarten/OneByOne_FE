import { useState } from "react";

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
        component: `
클릭으로 상태를 변경할 수 있는 스위치 컴포넌트입니다.

**기능:**
- Radix UI 기반
- 부드러운 애니메이션 
- 접근성 지원
- 키보드 네비게이션

**사용 시나리오:**
- 기능 활성화/비활성화
- 알림 설정
- 개인정보 공개 여부
        `,
      },
    },
  },
  argTypes: {
    checked: {
      description: "스위치 상태 (on/off)",
      control: "boolean",
    },
    disabled: {
      description: "비활성화 상태",
      control: "boolean",
    },
    onCheckedChange: {
      description: "상태 변경 핸들러",
      action: "switch toggled",
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveSwitchDemo = () => {
  const [isChecked, setIsChecked] = useState(false);

  return <Switch checked={isChecked} onCheckedChange={setIsChecked} />;
};

export const Default: Story = {
  render: () => <InteractiveSwitchDemo />,
  args: {
    checked: false,
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Switch checked={false} />
        <span>off</span>
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={true} />
        <span>on</span>
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={false} disabled />
        <span className="text-gray-400">disabled (off)</span>
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={true} disabled />
        <span className="text-gray-400">disabled (on)</span>
      </div>
    </div>
  ),
  args: {
    checked: false,
  },
  parameters: {
    docs: {
      description: {
        story: "스위치의 다양한 상태를 확인할 수 있습니다.",
      },
    },
  },
};

const SettingsPageDemo = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    sounds: false,
    location: true,
  });

  const handleSettingChange = (key: keyof typeof settings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const settingItems = [
    {
      key: "notifications" as const,
      label: "알림",
      description: "새로운 메시지와 업데이트 알림",
    },
    {
      key: "darkMode" as const,
      label: "개인정보 공개",
      description: "최근 근무 지역 공개 여부",
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

export const UserScenario: Story = {
  render: () => <SettingsPageDemo />,
  args: {
    checked: false,
  },
  parameters: {
    docs: {
      description: {
        story: "프로필 설정 시나리오에서의 스위치 사용 예시입니다.",
      },
    },
  },
};
