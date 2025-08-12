import Button from "@/shared/ui/buttons/base-button";

interface SubmitButtonProps {
  label: string;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function SubmitButton({
  label,
  disabled,
  variant = "secondary",
  className,
}: SubmitButtonProps) {
  return (
    <Button
      variant={variant}
      type="submit"
      size="lg"
      font="md"
      disabled={disabled}
      className={className}
    >
      {label}
    </Button>
  );
}
