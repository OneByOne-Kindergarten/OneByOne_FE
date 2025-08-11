import Button from "@/shared/ui/buttons/base-button";

interface SubmitButtonProps {
  label: string;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
}

export default function SubmitButton({
  label,
  disabled,
  variant = "secondary",
}: SubmitButtonProps) {
  return (
    <Button
      variant={variant}
      type="submit"
      size="lg"
      font="md"
      disabled={disabled}
    >
      {label}
    </Button>
  );
}
