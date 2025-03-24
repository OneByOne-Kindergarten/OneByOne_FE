import Button from "@/components/@shared/buttons/base-button";
import Header from "@/components/@shared/headers/base-header";

interface SaveHeaderProps {
  title?: string;
  hasBorder?: boolean;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
}

export default function SaveHeader({
  title,
  hasBorder,
  hasBackButton,
  onBackButtonClick,
}: SaveHeaderProps) {
  return (
    <Header
      title={title}
      hasBorder={hasBorder}
      hasBackButton={hasBackButton}
      onBackButtonClick={onBackButtonClick}
    >
      <Button
        type="button"
        variant="tertiary"
        border="blue"
        size="sm"
        font="sm"
        aria-label="임시 저장"
      >
        임시저장
      </Button>
    </Header>
  );
}
