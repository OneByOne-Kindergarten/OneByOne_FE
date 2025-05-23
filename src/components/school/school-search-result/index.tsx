import { useEffect, useCallback, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { useInView } from "react-intersection-observer";
import styles from "@/styles/scroll.module.css";

import SchoolCard from "@/components/school/school-card";
import { Kindergarten } from "@/types/kindergartenDTO";

// 가상 스크롤 항목
type KindergartenItemProps = {
  index: number;
  style: React.CSSProperties;
  data: {
    items: Kindergarten[];
    onItemClick: (id: string) => void;
    lastItemRef:
      | React.RefObject<HTMLDivElement>
      | ((node?: Element | null) => void);
  };
};

const KindergartenItem = ({ index, style, data }: KindergartenItemProps) => {
  const kindergarten = data.items[index];

  const isLastItem = index === data.items.length - 1;

  return (
    <div style={style}>
      <div
        onClick={() => data.onItemClick(kindergarten.id.toString())}
        className="cursor-pointer py-1"
        ref={isLastItem ? data.lastItemRef : null}
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

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "0px 0px 200px 0px",
  });

  // 다음 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleItemClick = useCallback(
    (id: string) => {
      onKindergartenClick(id);
    },
    [onKindergartenClick]
  );

  if (!searchQuery) return null;

  return (
    <div className="flex flex-col gap-2 pt-4">
      <h3 className="font-semibold text-sm text-primary-dark01 mx-5">
        총 {totalItems > 0 && `${totalItems}`}개의 검색 결과
      </h3>
      <List
        height={listHeight}
        width="100%"
        itemCount={results.length}
        itemSize={itemHeight}
        itemData={{
          items: results,
          onItemClick: handleItemClick,
          lastItemRef: ref,
        }}
        className={styles["scrollbar-hide"]}
      >
        {KindergartenItem}
      </List>
    </div>
  );
}
