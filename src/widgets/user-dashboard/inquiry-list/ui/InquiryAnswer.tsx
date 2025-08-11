import clsx from "clsx";

import Badge from "@/shared/ui/badge";

interface InquiryAnswerProps {
  answer: string;
  expanded: boolean;
}

export default function InquiryAnswer({
  answer,
  expanded,
}: InquiryAnswerProps) {
  return (
    <div
      className={clsx(
        "grid transition-all duration-200 ease-out",
        expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      )}
    >
      <div className="overflow-hidden">
        <div className="flex flex-col gap-1.5 rounded-lg border-2 border-primary-light02 bg-primary-foreground p-5">
          <Badge variant="tertiary">원바원</Badge>
          <p className="flex flex-col gap-1 text-sm text-primary-dark01">
            <span>안녕하세요 선생님! 원바원입니다.</span>
            <span>{answer}</span>
            <span className="mt-3">감사합니다.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
