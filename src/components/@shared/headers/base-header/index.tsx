import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "react-router-dom";

import { cn } from "@/utils/cn";
import { SVG_PATHS, IMAGE_PATHS } from "@/constants/assets-path";
import { useHeaderNavigation } from "@/hooks/useHeaderNavigation";
import { URL_PATHS } from "@/constants/url-path";

interface HeaderProps extends VariantProps<typeof headerVariants> {
  children?: React.ReactNode;
  title?: string;
  headerLogo?: boolean;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
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
  headerLogo,
  hasBorder = true,
  hasBackButton,
  onBackButtonClick,
}: HeaderProps) {
  // 헤더 네비게이션 훅 사용
  const { shouldShowBackButton, handleBackNavigation } = useHeaderNavigation({
    hasBackButton,
    onBackButtonClick,
  });

  return (
    <header className={cn(headerVariants({ hasBorder }))}>
      {shouldShowBackButton && (
        <button onClick={handleBackNavigation} aria-label="뒤로 가기">
          <img src={SVG_PATHS.ARROW.left} alt="뒤로 가기" className="h-6 w-6" />
        </button>
      )}
      <div className="flex w-full items-center justify-between">
        {title ? (
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
        {children}
      </div>
    </header>
  );
}
