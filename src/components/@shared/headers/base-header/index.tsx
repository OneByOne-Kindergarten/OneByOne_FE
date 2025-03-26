import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { SVG_PATHS } from "@/constants/assets-path";
import { useHeaderNavigation } from "@/hooks/useHeaderNavigation";

interface HeaderProps extends VariantProps<typeof headerVariants> {
  children?: React.ReactNode;
  title?: string;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
}

const headerVariants = cva(
  "sticky top-0 w-full min-w-80 max-w-3xl bg-white flex h-14 items-center px-5 font-bold text-lg",
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
        <button
          className="mr-3"
          onClick={handleBackNavigation}
          aria-label="뒤로 가기"
        >
          <img src={SVG_PATHS.ARROW.left} alt="뒤로 가기" className="w-6 h-6" />
        </button>
      )}
      <div className="flex items-center justify-between w-full">
        {title && <h1>{title}</h1>}
        {children}
      </div>
    </header>
  );
}
