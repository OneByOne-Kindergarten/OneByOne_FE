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
        <div className="relative w-full mr-5">
          <Form {...form}>
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      placeholder="검색어를 입력해주세요"
                      className="py-1.5 pr-9 text-sm font-normal text-primary-dark01 w-full pl-9"
                      {...field}
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
              className="absolute top-2 left-3 opacity-30 z-10"
            />
            <button
              type="button"
              className="flex items-center justify-center w-4 h-4 bg-primary-normal01 rounded-full absolute top-2 right-3 z-10"
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
          </Form>
        </div>
        <button
          type="button"
          onClick={handleCancelSearch}
          className="z-10"
          aria-label="검색 취소"
        >
          <img src={SVG_PATHS.CANCEL} alt="취소" className="w-6 h-6" />
        </button>
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
