import { useEffect, useCallback, useState } from "react";
import { FixedSizeList as List } from "react-window";

import SchoolCard from "@/components/school/school-card";
import { Kindergarten } from "@/types/kindergarten";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import ErrorMessage from "@/components/@shared/form/error-message";
import { useInView } from "react-intersection-observer";
import styles from "@/styles/scroll.module.css";

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
          category={kindergarten.establishment}
          score={0}
        />
      </div>
    </div>
  );
};

interface SchoolSearchResultProps {
  searchQuery: string;
  results: Kindergarten[];
  totalItems: number;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  error: unknown;
  onKindergartenClick: (id: string) => void;
}

export default function SchoolSearchResult({
  searchQuery,
  results,
  totalItems,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  error,
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
    rootMargin: "0px 0px 200px 0px", // 하단에서 200px 전에 로드 시작
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

      {isLoading && results.length === 0 ? (
        <div className="flex justify-center items-center py-10">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-8">
          <ErrorMessage error={error.toString()} />
        </div>
      ) : results.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <p className="text-sm text-primary-normal03">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <>
          <List
            height={listHeight}
            width="100%"
            itemCount={results.length}
            itemSize={itemHeight}
            itemData={{
              items: results,
              onItemClick: handleItemClick,
            }}
            className={styles["scrollbar-hide"]}
          >
            {KindergartenItem}
          </List>

          <div ref={ref} className="w-full h-10">
            {isFetchingNextPage && null}
          </div>
        </>
      )}
    </div>
  );
}
