import clsx from "clsx";
import { useState } from "react";

import Button from "@/components/@shared/buttons/base-button";
import { SVG_PATHS } from "@/constants/assets-path";

interface ChatBarProps {
  replyParentId?: number;
  replyUserName?: string;
  onCancelReply: () => void;
  onSubmit: (content: string, parentId?: number) => void;
  value: string;
  onChange: (value: string) => void;
}

export default function ChatBar({
  replyParentId,
  replyUserName,
  onCancelReply,
  onSubmit,
  value,
  onChange,
}: ChatBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleCancelReply = () => {
    if (onCancelReply) {
      onCancelReply();
    }
  };

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value, replyParentId);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed bottom-0 mx-auto flex w-full min-w-80 max-w-3xl items-center justify-between bg-white px-5 pb-3.5 pt-2 text-xs transition-all duration-200">
      <div className="flex w-full flex-col">
        {replyUserName && (
          <div className="mb-2 flex items-center justify-between pb-2 duration-200 ease-out animate-in fade-in slide-in-from-bottom-2">
            <p className="text-xs text-primary-dark01">
              <span className="text-tertiary-3">{replyUserName}</span>
              님에게 답글 남기는 중
            </p>
            <button
              type="button"
              onClick={handleCancelReply}
              className="opacity-50 transition-opacity duration-150 hover:opacity-100"
            >
              <img
                src={SVG_PATHS.CANCEL}
                alt="X 아이콘"
                width={20}
                height={20}
              />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <textarea
            value={value}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="댓글을 입력해주세요."
            className={clsx(
              "scrollbar-none flex w-full flex-1 resize-none overflow-hidden rounded-lg border border-primary-light02 bg-primary-foreground px-3.5 py-2.5 text-sm outline-none transition-all duration-200",
              isFocused ? "h-24" : "h-11"
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Button
            type="button"
            variant="secondary"
            font="sm_sb"
            className="absolute bottom-5 right-8 mb-0.5 self-end px-2 py-1 text-primary-dark01"
            onClick={handleSubmit}
          >
            등록
          </Button>
        </div>
      </div>
    </div>
  );
}
