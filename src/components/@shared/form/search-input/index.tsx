import { useRef, forwardRef } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/@shared/form";
import Input from "@/components/@shared/form/input";
import { SVG_PATHS } from "@/constants/assets-path";

interface SearchInputProps {
  placeholder?: string;
  initialValue?: string;
  onSubmit: (query: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
}

interface SearchFormValues {
  search: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    const {
      placeholder = "검색어를 입력하세요",
      initialValue = "",
      onSubmit,
      onClear,
      autoFocus = false,
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<SearchFormValues>({
      defaultValues: {
        search: initialValue,
      },
    });

    const handleSubmit = (data: SearchFormValues) => {
      if (data.search.trim() !== "") {
        onSubmit(data.search);
      }
    };

    const handleClearSearch = () => {
      form.setValue("search", "");
      if (inputRef.current) {
        inputRef.current.focus();
      }
      if (onClear) {
        onClear();
      }
    };

    return (
      <div className="relative w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder={placeholder}
                      className="w-full py-1.5 pl-9 pr-9 text-sm font-normal text-primary-dark01"
                      {...field}
                      ref={(e) => {
                        inputRef.current = e;
                        if (typeof ref === "function") {
                          ref(e);
                        } else if (ref) {
                          ref.current = e;
                        }
                        field.ref(e);
                      }}
                      autoFocus={autoFocus}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <img
              src={SVG_PATHS.SEARCH}
              alt="돋보기"
              width={17}
              height={17}
              className="absolute left-3 top-2 z-10 opacity-30"
            />
            {form.watch("search") && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-2 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-primary-normal01"
                aria-label="검색어 초기화"
              >
                <img
                  src={SVG_PATHS.CANCEL}
                  alt="X 아이콘"
                  width={12}
                  height={12}
                  className="opacity-30"
                />
              </button>
            )}
          </form>
        </Form>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
