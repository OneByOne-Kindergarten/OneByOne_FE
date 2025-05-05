import { useState } from "react";

import PageLayout from "@/components/@shared/layout/page-layout";
import Toggle from "@/components/@shared/buttons/base-toggle";
import Button from "@/components/@shared/buttons/base-button";
import BarRating from "@/components/@shared/rating/bar-rating";
import Badge from "@/components/@shared/badge";
import PopupModal from "@/components/@shared/modal/pop-up";
import BottomSheet from "@/components/@shared/modal/bottom-sheet";
import Dropdown from "@/components/@shared/drop-down/base-drop-down";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import { SVG_PATHS } from "@/constants/assets-path";
import { URL_PATHS } from "@/constants/url-path";

export default function TEST() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [headerType, setHeaderType] = useState<
    "base" | "community" | "school" | "bookmark" | "save"
  >("base");

  // 드롭다운 옵션 정의
  const dropdownOptions = [
    {
      label: "편집하기",
      onClick: () => setSelectedOption("편집하기"),
      icon: <img src={SVG_PATHS.POST.edit} alt="편집" className="w-4 h-4" />,
    },
    {
      label: "공유하기",
      onClick: () => setSelectedOption("공유하기"),
      icon: <img src={SVG_PATHS.SHARE} alt="공유" className="w-4 h-4" />,
    },
    {
      label: "삭제하기",
      onClick: () => setSelectedOption("삭제하기"),
      variant: "destructive" as const,
      icon: <img src={SVG_PATHS.CANCEL} alt="삭제" className="w-4 h-4" />,
    },
    {
      label: "비활성화 옵션",
      onClick: () => setSelectedOption("비활성화 옵션"),
      disabled: true,
    },
  ];

  // 드롭다운 커스텀 트리거
  const customTrigger = (
    <Button variant="transparent" className="flex items-center gap-1">
      <span>메뉴</span>
      <img
        src={SVG_PATHS.ARROW.left}
        alt="아래 화살표"
        className="w-4 h-4 rotate-90"
      />
    </Button>
  );

  // 헤더 타입 변경 함수
  const changeHeaderType = (
    type: "base" | "community" | "school" | "bookmark" | "save"
  ) => {
    setHeaderType(type);
  };

  return (
    <PageLayout
      title="원바원"
      description="컴포넌트 테스트 페이지"
      currentPath={URL_PATHS.TEST}
      isGlobalNavBar={false}
      mainClassName="my-auto flex flex-col gap-[10vh] p-4"
      wrapperBg="white"
      headerTitle="페이지 타이틀"
      headerType={headerType}
      hasBackButton={true}
    >
      <div className="flex flex-col gap-12">
        <section>
          <h2 className="bg-gray-200 p-1 mb-2">헤더 타입 변경</h2>
          <div className="flex gap-2">
            <Button
              variant={headerType === "base" ? "primary" : "tertiary"}
              onClick={() => changeHeaderType("base")}
            >
              기본 헤더
            </Button>
            <Button
              variant={headerType === "community" ? "primary" : "tertiary"}
              onClick={() => changeHeaderType("community")}
            >
              커뮤니티 헤더
            </Button>
            <Button
              variant={headerType === "school" ? "primary" : "tertiary"}
              onClick={() => changeHeaderType("school")}
            >
              유치원 헤더
            </Button>
            <Button
              variant={headerType === "bookmark" ? "primary" : "tertiary"}
              onClick={() => changeHeaderType("bookmark")}
            >
              북마크 헤더
            </Button>
            <Button
              variant={headerType === "save" ? "primary" : "tertiary"}
              onClick={() => changeHeaderType("save")}
            >
              임시 저장 헤더
            </Button>
          </div>
        </section>

        <section>
          <h2 className="bg-gray-200 p-1 mb-2">드롭다운</h2>
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex flex-wrap gap-8 items-start">
                <div>
                  <p className="text-xs mb-2">기본</p>
                  <Dropdown options={dropdownOptions} />
                </div>
                <div>
                  <p className="text-xs mb-2">커스텀 트리거</p>
                  <Dropdown options={dropdownOptions} trigger={customTrigger} />
                </div>
                <div>
                  <p className="text-xs mb-2">위로 펼쳐짐</p>
                  <Dropdown options={dropdownOptions} position="top" />
                </div>
                <div>
                  <p className="text-xs mb-2">왼쪽으로 펼쳐짐</p>
                  <Dropdown options={dropdownOptions} position="left" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold mb-2">정렬 및 너비</h3>
              <div className="flex flex-wrap gap-8 items-start">
                <div>
                  <p className="text-xs mb-2">가운데 정렬</p>
                  <Dropdown options={dropdownOptions} align="center" />
                </div>
                <div>
                  <p className="text-xs mb-2">오른쪽 정렬</p>
                  <Dropdown options={dropdownOptions} align="end" />
                </div>
                <div>
                  <p className="text-xs mb-2">전체 너비</p>
                  <div className="w-40">
                    <Dropdown
                      options={dropdownOptions}
                      width="full"
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </div>

            {selectedOption && (
              <div className="bg-gray-100 p-4 rounded-md">
                <p>
                  선택된 옵션: <strong>{selectedOption}</strong>
                </p>
              </div>
            )}
          </div>
        </section>

        <section>
          <h2 className="bg-gray-200 p-1 mb-2">버튼</h2>
          <div className="flex flex-wrap gap-2">
            <Button>default</Button>
            <Button variant="primary">primary</Button>
            <Button variant="secondary">secondary</Button>
            <Button variant="tertiary">tertiary</Button>
            <Button variant="destructive">destructive</Button>
            <Button variant="tertiary" border="blue">
              tertiary with border
            </Button>
            <Button variant="transparent">transparent</Button>
          </div>
        </section>

        <section>
          <h2 className="bg-gray-200 p-1 mb-2">토글</h2>
          <div className="flex flex-wrap gap-2">
            <Toggle size="lg" border="gray">
              토글
            </Toggle>
            <Toggle variant="primary" size="md">
              토글
            </Toggle>
            <Toggle size="sm">
              <img
                src={SVG_PATHS.CHARACTER.chick}
                alt="테스트"
                width="20"
                height="20"
              />
              토글
            </Toggle>
          </div>
        </section>

        <section>
          <h2 className="bg-gray-200 p-1 mb-2">뱃지</h2>
          <div className="flex gap-2">
            <Badge variant="primary">뱃지</Badge>
            <Badge variant="secondary">뱃지</Badge>
            <Badge variant="tertiary">뱃지</Badge>
          </div>
        </section>

        <section>
          <h2 className="bg-gray-200 p-1 mb-2">모달</h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setIsPopupOpen(true)}>팝업 모달 열기</Button>
            <Button onClick={() => setIsBottomSheetOpen(true)}>
              바텀 시트 열기
            </Button>
          </div>
        </section>
      </div>

      <section>
        <h2 className="bg-gray-200 p-1 mb-2">진행도</h2>
        <div className="flex flex-wrap gap-2">
          <BarRating value={4} className="h-2 w-12" />
          <LoadingSpinner />
        </div>
      </section>

      <PopupModal
        isOpen={isPopupOpen}
        hasCloseButton={false}
        onClose={() => setIsPopupOpen(false)}
        title="팝업 모달 제목"
        footer={
          <div className="flex gap-2 justify-center w-full">
            <Button
              variant="tertiary"
              onClick={() => setIsPopupOpen(false)}
              className="w-full"
            >
              취소
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsPopupOpen(false)}
              className="w-full"
            >
              확인
            </Button>
          </div>
        }
      >
        <div>
          <p className="mb-4">
            팝업 모달의 내용입니다. 다양한 콘텐츠를 추가할 수 있습니다.
          </p>
          <p>
            확장 가능한 컴포넌트로 설계되어 있어 헤더, 콘텐츠, 푸터를 자유롭게
            구성할 수 있습니다.
          </p>
        </div>
      </PopupModal>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        title="바텀 시트 제목"
        footer={
          <>
            <Button className="w-full">취소</Button>
            <Button className="w-full">확인</Button>
          </>
        }
      >
        <p className="mb-4">바텀 시트 내용</p>
        <ul className="list-disc pl-5 mb-4">
          <li>항목 1</li>
          <li>항목 2</li>
        </ul>
      </BottomSheet>
    </PageLayout>
  );
}
