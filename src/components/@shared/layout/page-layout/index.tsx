import { ReactNode } from "react";
import Wrapper from "@/components/@shared/layout/page-wrapper";
import Header from "@/components/@shared/headers/header";
import Main from "@/components/@shared/layout/main";
import GlobalNavBar from "@/components/@shared/nav/global-nav-bar";
import Metadata from "@/hooks/useMetadata";

/**
 * 페이지의 공용 레이아웃
 * @param children
 * @param title Metadata, 페이지 제목
 * @param description Metadata, 페이지 설명
 * @param headerTitle 설정하지 않을 시 헤더 표시 X
 * @param headerHasBorder Header 하단 테두리 유무, 기본 값 true
 * @param hasBackButton 헤더에 뒤로가기 버튼 표시 여부
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
  headerHasBorder?: boolean;
  hasBackButton?: boolean;
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
  headerHasBorder,
  currentPath,
  wrapperBg = "gray",
  mainBg = "white",
  mainClassName = "flex flex-col gap-6 pb-5 mb-24",
  isGlobalNavBar = true,
}: PageLayoutProps) {
  return (
    <Wrapper bg={wrapperBg}>
      <Metadata title={title} description={description} />
      {headerTitle && (
        <Header hasBorder={headerHasBorder}>{headerTitle}</Header>
      )}
      <Main bg={mainBg} className={mainClassName}>
        {children}
      </Main>
      {isGlobalNavBar && <GlobalNavBar currentPath={currentPath} />}
    </Wrapper>
  );
}
