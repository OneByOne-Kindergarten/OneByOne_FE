import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/@shared/form";
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
  const form = useForm({
    defaultValues: {
      content: value || "",
    },
  });

  useEffect(() => {
    form.setValue("content", value || "");
  }, [value, form]);

  const handleCancelReply = () => {
    if (onCancelReply) {
      onCancelReply();
    }
  };

  const handleSubmit = () => {
    onSubmit(value, replyParentId);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
    form.setValue("content", e.target.value);
  };

  return (
    <div className="fixed bottom-0 mx-auto flex w-full min-w-80 max-w-3xl items-center justify-between border-t border-opacity-5 bg-white px-5 pb-3 pt-2 text-xs transition-all duration-200">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="flex w-full flex-col">
          <FormField
            control={form.control}
            name="content"
            render={({
              field: { ref, onChange: fieldOnChange, ...fieldProps },
            }) => (
              <FormItem className="w-full">
                {replyUserName && (
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs text-primary-dark01">
                      <span className="text-tertiary-3">{replyUserName}</span>
                      님에게 답글 남기는 중
                    </p>
                    <button
                      type="button"
                      onClick={handleCancelReply}
                      className="opacity-50"
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
                  <FormControl>
                    <textarea
                      {...fieldProps}
                      ref={ref}
                      value={value || fieldProps.value}
                      onChange={handleTextareaChange}
                      placeholder="댓글을 입력해주세요."
                      className={clsx(
                        "flex w-full flex-1 resize-none rounded-lg bg-primary-foreground px-4 py-2.5 text-sm outline-none transition-all duration-200",
                        isFocused ? "h-24" : "h-10"
                      )}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    variant="secondary"
                    className="absolute bottom-5 right-7 self-end px-2 py-1"
                  >
                    등록
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
