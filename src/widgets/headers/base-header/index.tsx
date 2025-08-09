import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "react-router-dom";

import { IMAGE_PATHS, SVG_PATHS } from "@/common/constants/assets-path";
import { URL_PATHS } from "@/common/constants/url-path";
import AlarmButton from "@/common/ui/buttons/alarm-button";
import { cn } from "@/common/utils/cn";

import useHeaderNavigation from "../useHeaderNavigation";

interface HeaderProps extends VariantProps<typeof headerVariants> {
  children?: React.ReactNode;
  title?: string;
  titleElement?: React.ReactNode;
  headerLogo?: boolean;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
  showAlarmButton?: boolean;
}

const headerVariants = cva(
  "fixed top-0 z-50 gap-3 w-full min-w-80 max-w-3xl bg-white flex h-14 items-center px-5 font-bold text-lg",
  {
    variants: {
      hasBorder: {
        true: "border-b border-opacity-5",
        false: "",
      },
    },
    defaultVariants: {
      hasBorder: true,
    },
  }
);

export default function Header({
  children,
  title,
  titleElement,
  headerLogo,
  hasBorder = true,
  hasBackButton,
  onBackButtonClick,
  showAlarmButton = false,
}: HeaderProps) {
  // 헤더 네비게이션 훅 사용
  const { shouldShowBackButton, handleBackNavigation } = useHeaderNavigation({
    hasBackButton,
    onBackButtonClick,
  });

  return (
    <header className={cn(headerVariants({ hasBorder }))}>
      {shouldShowBackButton && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleBackNavigation();
          }}
          aria-label="뒤로 가기"
        >
          <img
            src={SVG_PATHS.ARROW.left}
            alt="뒤로 가기"
            className="h-6 w-6 duration-200 hover:opacity-80 active:opacity-70"
          />
        </button>
      )}
      <div className="flex w-full items-center justify-between">
        {titleElement ? (
          <div className="min-w-0 flex-1">{titleElement}</div>
        ) : title ? (
          <h1 className="min-w-0 flex-1 truncate pr-2">{title}</h1>
        ) : headerLogo ? (
          <Link to={URL_PATHS.HOME} className="flex-shrink-0">
            <img
              src={IMAGE_PATHS.LOGO.MAIN}
              alt="원바원 로고"
              width={51}
              height={18}
            />
          </Link>
        ) : null}
        {/* 알림 버튼 표시 여부 */}
        <div className="flex items-center gap-2">
          {showAlarmButton && <AlarmButton />}
          {children}
        </div>
      </div>
    </header>
  );
}
