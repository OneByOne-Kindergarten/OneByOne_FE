import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Button from "@/components/@shared/buttons/base-button";
import { CategoryOption } from "@/constants/community";
import { setCommunityState } from "@/utils/lastVisitedPathUtils";

interface CategorySelectorProps {
  type: "teacher" | "pre-teacher";
  categoryOptions: CategoryOption[];
}

export default function CategorySelector({
  type,
  categoryOptions,
}: CategorySelectorProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const currentCategory = searchParams.get("category") || "top10";

  const handleCategoryChange = (category: string) => {
    if (category === currentCategory) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("category", category);
    newSearchParams.set("type", type);
    setSearchParams(newSearchParams);

    // 세션 스토리지 업데이트
    setCommunityState({
      path: `/community?type=${type}&category=${category}`,
      category: type,
      communityCategoryName: category,
    });

    // 카테고리 변경 시 refetch
    if (category === "all" || category !== "top10") {
      const queryParams = {
        pageSize: 10,
        category: type === "teacher" ? "TEACHER" : "PROSPECTIVE_TEACHER",
        categoryName: category !== "all" ? category : undefined,
      };

      queryClient.refetchQueries({
        queryKey: ["communityPosts", queryParams],
        exact: false,
      });
    } else if (category === "top10") {
      queryClient.refetchQueries({
        queryKey: ["popularPosts"],
      });
    }
  };

  return (
    <section className="scrollbar-x-hidden flex w-full gap-2 overflow-x-auto whitespace-nowrap">
      {categoryOptions.map((option: CategoryOption) => (
        <Button
          key={option.value}
          shape="full"
          font="md"
          size="lg"
          variant={currentCategory === option.value ? "secondary" : "default"}
          onClick={() => handleCategoryChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </section>
  );
}
