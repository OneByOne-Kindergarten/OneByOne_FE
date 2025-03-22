import { cva, type VariantProps } from "class-variance-authority";

/**
 * 페이지의 최상위 컨테이너
 * @param children
 * @param bg 기본 값 gray
 */

interface WrapperProps extends VariantProps<typeof wrapperVariants> {
  children: React.ReactNode;
}

const wrapperVariants = cva(
  "relative w-full min-w-80 max-w-3xl mx-auto min-h-screen h-full flex flex-col",
  {
    variants: {
      bg: {
        white: "bg-white",
        gray: "bg-primary-foreground",
      },
    },
    defaultVariants: {
      bg: "gray",
    },
  }
);

export default function Wrapper({ children, bg }: WrapperProps) {
  return (
    <div className={wrapperVariants({ bg })} style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}
