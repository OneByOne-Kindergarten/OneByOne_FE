import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "@/components/@shared/headers/base-header";
import Button from "@/components/@shared/buttons/base-button";
import Input from "@/components/@shared/form/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/@shared/form";
import { SVG_PATHS } from "@/constants/assets-path";

interface SchoolHeaderProps {
  title?: string;
  hasBorder?: boolean;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
}

export default function SchoolHeader({
  title = "원바원",
  hasBorder,
  hasBackButton,
  onBackButtonClick,
}: SchoolHeaderProps) {
  const form = useForm();
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    setIsSearching(true);
  };

  const handleCancelSearch = () => {
    setIsSearching(false);
  };

  const handleSearchSubmit = (data: any) => {
    console.log("검색어:", data.search);
    handleCancelSearch();
  };

  const handleBookmark = () => {
    // TODO: 북마크 기능
  };

  const handleMap = () => {
    // TODO: 맵 기능
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
                      placeholder="유치원 이름을 검색해보세요"
                      variant="outline"
                      className="py-2 px-3 text-sm w-full"
                      {...field}
                      ref={inputRef}
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
      <div className="flex items-center gap-4">
        <button onClick={handleBookmark} aria-label="북마크">
          <img src={SVG_PATHS.BOOKMARKER} alt="북마크" className="w-6 h-6" />
        </button>
        <button onClick={handleMap} aria-label="지도">
          <img src={SVG_PATHS.MAP} alt="지도" className="w-6 h-6" />
        </button>
        <button onClick={handleSearch} aria-label="검색">
          <img src={SVG_PATHS.SEARCH} alt="검색" className="w-6 h-6" />
        </button>
      </div>
    </Header>
  );
}
