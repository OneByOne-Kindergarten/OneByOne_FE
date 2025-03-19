import { cva, type VariantProps } from "class-variance-authority";

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

interface WrapperProps extends VariantProps<typeof wrapperVariants> {
  children: React.ReactNode;
}

export default function Wrapper({ children, bg }: WrapperProps) {
  return (
    <div className={wrapperVariants({ bg })} style={{ minHeight: "100vh" }}>
      {children}
    </div>
  );
}
