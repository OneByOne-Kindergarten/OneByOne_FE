import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SVG_PATHS } from "@/constants/assets-path";
import Input from "@/components/@shared/form/input";
import Header from "@/components/@shared/headers/base-header";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/@shared/form";

interface CommunityHeaderProps {
  title?: string;
  hasBorder?: boolean;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
}

export default function CommunityHeader({
  title = "커뮤니티",
  hasBorder,
  hasBackButton,
  onBackButtonClick,
}: CommunityHeaderProps) {
  const form = useForm();
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
  };

  const handleCancelSearch = () => {
    setIsSearching(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchInput = form.elements.namedItem("search") as HTMLInputElement;

    // TODO: API 호출
    console.log("검색어:", searchInput.value);

    setIsSearching(false);
  };

  if (isSearching) {
    return (
      <Header hasBackButton={hasBackButton} hasBorder={hasBorder}>
        <div className="relative w-full">
          <Form {...form}>
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="검색어를 입력해주세요"
                      variant="outline"
                      className="py-2 px-3 text-sm w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="button"
              onClick={handleCancelSearch}
              className="absolute top-2 right-2 z-10"
              aria-label="취소"
            >
              <img src={SVG_PATHS.CANCEL} alt="취소" className="w-6 h-6" />
            </button>
          </Form>
        </div>
      </Header>
    );
  }

  return (
    <Header
      title={title}
      hasBorder={hasBorder}
      hasBackButton={hasBackButton}
      onBackButtonClick={onBackButtonClick}
    >
      <button onClick={handleSearch} className="ml-auto" aria-label="검색">
        <img src={SVG_PATHS.SEARCH} alt="검색" className="w-6 h-6" />
      </button>
    </Header>
  );
}
