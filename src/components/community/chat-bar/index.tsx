import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/@shared/form";

export default function ChatBar() {
  const [isFocused, setIsFocused] = useState(false);
  const form = useForm();

  return (
    <div className="fixed bottom-0 items-center w-full text-xs min-w-80 max-w-3xl bg-white flex py-3 px-8 mx-auto justify-between border-t border-opacity-5 transition-all duration-200">
      <Form {...form}>
        <FormField
          control={form.control}
          name="search"
          render={({ field: { ref, ...fieldProps } }) => (
            <FormItem className="w-full">
              <FormControl>
                <textarea
                  {...fieldProps}
                  ref={ref}
                  placeholder="댓글을 입력해주세요."
                  className={clsx(
                    "flex flex-1 mb-auto text- py-2.5 px-4 text-sm w-full bg-primary-foreground rounded-lg transition-all duration-200 resize-none outline-none",
                    isFocused ? "h-24" : "h-10"
                  )}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
}
