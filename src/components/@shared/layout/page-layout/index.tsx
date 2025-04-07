import { ReactNode } from "react";
import Wrapper from "@/components/@shared/layout/page-wrapper";
import BaseHeader from "@/components/@shared/headers/base-header";
import CommunityHeader from "@/components/@shared/headers/community-header";
import SchoolHeader from "@/components/@shared/headers/school-header";
import SaveHeader from "@/components/@shared/headers/save-header";
import BookmarkHeader from "@/components/@shared/headers/bookmark-header";
import Main from "@/components/@shared/layout/main";
import GlobalNavBar from "@/components/@shared/nav/global-nav-bar";
import Metadata from "@/hooks/useMetadata";

/**
 * 페이지의 공용 레이아웃
 * @param children
 * @param title Metadata, 페이지 제목
 * @param description Metadata, 페이지 설명
 * @param headerTitle 설정하지 않을 시 헤더 표시 X
 * @param headerType 헤더 타입 (base, community, school, save,bookmark)
 * @param headerHasBorder Header 하단 테두리 유무, 기본 값 true
 * @param hasBackButton 헤더에 뒤로가기 버튼 표시 여부
 * @param onBackButtonClick 뒤로가기 버튼 클릭 시 실행할 함수
 * @param currentPath
 * @param wrapperBg 기본 값 gray
 * @param mainBg 기본 값 white
 * @param mainClassName
 * @param isGlobalNavBar 기본 값 true
 */

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  headerTitle?: string;
  headerType?: "base" | "community" | "school" | "save" | "bookmark";
  headerHasBorder?: boolean;
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
  currentPath: string;
  wrapperBg?: "white" | "gray";
  mainBg?: "white" | "gray";
  mainClassName?: string;
  isGlobalNavBar?: boolean;
}

export default function PageLayout({
  children,
  title = "원바원",
  description = "유치원 교사들을 위한 유치원 리뷰 및 커뮤니티 서비스",
  headerTitle,
  headerType = "base",
  headerHasBorder,
  hasBackButton,
  onBackButtonClick,
  currentPath,
  wrapperBg = "gray",
  mainBg = "white",
  mainClassName = "flex flex-col gap-6 pb-5 mb-24",
  isGlobalNavBar = true,
}: PageLayoutProps) {
  const renderHeader = () => {
    if (!headerTitle) return null;

    const headerProps = {
      title: headerTitle,
      hasBorder: headerHasBorder,
      hasBackButton: hasBackButton,
      onBackButtonClick: onBackButtonClick,
    };

    switch (headerType) {
      case "community":
        return <CommunityHeader {...headerProps} />;
      case "school":
        return <SchoolHeader {...headerProps} />;
      case "save":
        return <SaveHeader {...headerProps} />;
      case "bookmark":
        return <BookmarkHeader {...headerProps} />;
      default:
        return <BaseHeader {...headerProps} />;
    }
  };

  return (
    <Wrapper bg={wrapperBg}>
      <Metadata title={title} description={description} />
      {renderHeader()}
      <Main bg={mainBg} className={mainClassName}>
        {children}
      </Main>
      {isGlobalNavBar && <GlobalNavBar currentPath={currentPath} />}
    </Wrapper>
  );
}
