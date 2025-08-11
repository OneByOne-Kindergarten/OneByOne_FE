import Button from "@/shared/ui/buttons/base-button";

interface StartButtonProps {
  isDisabled: boolean;
  onClick: () => void;
}

export default function StartButton({ isDisabled, onClick }: StartButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      variant="secondary"
      font="md"
      className="mt-2"
    >
      시작하기
    </Button>
  );
}
