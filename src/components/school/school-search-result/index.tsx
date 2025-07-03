import { useCallback, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";

import SchoolCard from "@/components/school/school-card";
// TODO: 서버에서 sort 지원 시 주석 해제
// import SchoolSearchOrder from "@/components/school/SchoolSearchOrder";
import styles from "@/styles/scroll.module.css";
import { Kindergarten } from "@/types/kindergartenDTO";

// 가상 스크롤 항목
type KindergartenItemProps = {
  index: number;
  style: React.CSSProperties;
  data: {
    items: Kindergarten[];
    onItemClick: (id: string) => void;
  };
};

const KindergartenItem = ({ index, style, data }: KindergartenItemProps) => {
  const kindergarten = data.items[index];

  return (
    <div style={style}>
      <div
        onClick={() => data.onItemClick(kindergarten.id.toString())}
        className="cursor-pointer py-1"
      >
        <SchoolCard
          id={kindergarten.id.toString()}
          schoolName={kindergarten.name}
          location={kindergarten.address}
          establishment={kindergarten.establishment}
          workReviewAggregate={kindergarten.workReviewAggregate}
        />
      </div>
    </div>
  );
};

interface SchoolSearchResultProps {
  searchQuery: string;
  results: Kindergarten[];
  totalItems: number;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  onKindergartenClick: (id: string) => void;
}

export default function SchoolSearchResult({
  searchQuery,
  results,
  totalItems,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  onKindergartenClick,
}: SchoolSearchResultProps) {
  const [maxListHeight, setMaxListHeight] = useState(() => {
    return typeof window !== "undefined" ? window.innerHeight - 80 : 680;
  });

  const itemHeight = 110;
  const listHeight = Math.min(results.length * itemHeight, maxListHeight);
  const loadMoreThreshold = Math.floor(results.length * 0.8);

  // 창 크기 변경 시 높이 업데이트
  useEffect(() => {
    const handleResize = () => {
      setMaxListHeight(window.innerHeight - 120);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleItemClick = useCallback(
    (id: string) => onKindergartenClick(id),
    [onKindergartenClick]
  );

  // 스크롤 위치 -> 다음 페이지 로드 처리
  const loadMoreItems = useCallback(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  // 가상 스크롤 아이템 범위 변경 감지
  const handleItemsRendered = useCallback(
    ({
      overscanStopIndex,
      visibleStopIndex,
    }: {
      overscanStartIndex: number;
      overscanStopIndex: number;
      visibleStartIndex: number;
      visibleStopIndex: number;
    }) => {
      if (
        visibleStopIndex > loadMoreThreshold &&
        overscanStopIndex >= results.length - 5
      ) {
        loadMoreItems();
      }
    },
    [results.length, loadMoreThreshold, loadMoreItems]
  );

  if (!searchQuery) return null;

  return (
    <div className="flex flex-col gap-2 pt-4">
      <div className="mx-5 flex justify-between">
        <h3 className="text-sm font-semibold text-primary-dark01">
          총 {totalItems > 0 && `${totalItems}`}개의 검색 결과
        </h3>
        {/* TODO: 서버에서 sort 지원 시 주석 해제 */}
        {/* <SchoolSearchOrder /> */}
      </div>
      <List
        height={listHeight}
        width="100%"
        itemCount={results.length}
        itemSize={itemHeight}
        onItemsRendered={handleItemsRendered}
        overscanCount={5}
        itemData={{
          items: results,
          onItemClick: handleItemClick,
        }}
        className={styles["scrollbar-hide"]}
      >
        {KindergartenItem}
      </List>
    </div>
  );
}
