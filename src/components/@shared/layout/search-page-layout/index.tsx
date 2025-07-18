import { ReactNode } from "react";

import SearchInput from "@/components/@shared/form/search-input";
import Header from "@/components/@shared/headers/base-header";
import Wrapper from "@/components/@shared/layout/page-wrapper";
import Metadata from "@/hooks/useMetadata";

interface SearchPageLayoutProps {
  children: ReactNode;
  title?: string;
  placeholder?: string;
  searchValue?: string;
  onSearchSubmit: (query: string) => void;
  onSearchClear?: () => void;
  onBackButtonClick?: () => void;
}

export default function SearchPageLayout({
  children,
  title = "검색",
  placeholder = "검색어를 입력하세요",
  searchValue = "",
  onSearchSubmit,
  onSearchClear,
  onBackButtonClick,
}: SearchPageLayoutProps) {
  return (
    <Wrapper bg="white">
      <Metadata
        title={title}
        description="유치원 교사들을 위한 유치원 리뷰 및 커뮤니티 서비스"
      />

      <Header
        hasBackButton={true}
        hasBorder={false}
        onBackButtonClick={onBackButtonClick}
        titleElement={
          <SearchInput
            placeholder={placeholder}
            initialValue={searchValue}
            onSubmit={onSearchSubmit}
            onClear={onSearchClear}
            autoFocus={true}
          />
        }
      />

      <div className="mt-14 flex-1 overflow-hidden">{children}</div>
    </Wrapper>
  );
}
