import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import PageLayout from "@/components/@shared/layout/page-layout";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/@shared/form";
import Input from "@/components/@shared/form/input";
import Textarea from "@/components/@shared/form/textarea";
import { URL_PATHS } from "@/constants/url-path";
import {
  getCommunityCategoryName,
  getCommunityCategory,
  getCommunityState,
  setCommunityCategory,
  setCommunityCategoryName,
} from "@/utils/lastVisitedPathUtils";
import {
  getValidCategoryName,
  getCategoryOptions,
} from "@/utils/categoryUtils";
import { useCreatePost } from "@/hooks/useCommunity";
import {
  CreateCommunityPostResponse,
  CreateCommunityPostRequest,
} from "@/types/communityDTO";
import Button from "@/components/@shared/buttons/base-button";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import Error from "@/components/@shared/layout/error";
import { useToast } from "@/hooks/useToast";

const postSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
  category: z.enum(["TEACHER", "PROSPECTIVE_TEACHER"]),
  communityCategoryName: z.string(),
});

type PostFormData = z.infer<typeof postSchema>;

export default function PostEditor() {
  const isSubmitting = useRef(false);

  // 메인 카테고리 (TEACHER 또는 PROSPECTIVE_TEACHER)
  const [selectedCategory, setSelectedCategory] = useState<
    "TEACHER" | "PROSPECTIVE_TEACHER"
  >(() => {
    const category = getCommunityCategory();
    return category || "TEACHER";
  });

  // 하위 카테고리 (예: "free", "university")
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(
    () => {
      // 1. 세션 스토리지에서 저장된 하위 카테고리명 가져오기
      const savedCategoryName = getCommunityCategoryName();

      // 2. 선택된 카테고리에 유효한 값이 있는지 확인하여 반환
      return getValidCategoryName(savedCategoryName, selectedCategory);
    }
  );

  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      category: selectedCategory,
      communityCategoryName: selectedCategoryName,
    },
    mode: "onBlur",
  });

  const { mutate: createPost, isPending, error } = useCreatePost();

  // 메인 카테고리 변경 시 하위 카테고리도 업데이트
  useEffect(() => {
    // 현재 선택된 communityCategoryName 존재 여부 확인
    const currentCategoryName = form.getValues("communityCategoryName");

    // 유효한 카테고리 이름 확인 (현재 카테고리에 속하는지 검증 후 반환)
    const newCategoryName = getValidCategoryName(
      currentCategoryName,
      selectedCategory
    );

    // 새 카테고리가 선택된 경우에만 업데이트
    if (newCategoryName !== currentCategoryName) {
      // 폼 값과 상태 업데이트
      setSelectedCategoryName(newCategoryName);
      form.setValue("communityCategoryName", newCategoryName);
    }

    // 메인 카테고리는 항상 업데이트
    form.setValue("category", selectedCategory);

    // 세션 스토리지 업데이트
    setCommunityCategory(selectedCategory);

    // 카테고리명은 변경된 경우에만 업데이트
    if (newCategoryName !== currentCategoryName) {
      setCommunityCategoryName(newCategoryName);
    }
  }, [selectedCategory, form]);

  const handleCategoryButtonClick = useCallback(
    (categoryName: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // 선택된 하위 카테고리 업데이트
      setSelectedCategoryName(categoryName);
      form.setValue("communityCategoryName", categoryName, {
        shouldDirty: true,
        shouldValidate: false,
      });

      // 메인 카테고리 유지
      if (form.getValues("category") !== selectedCategory) {
        form.setValue("category", selectedCategory, {
          shouldDirty: true,
          shouldValidate: false,
        });
      }

      // 세션 스토리지 업데이트
      setCommunityCategory(selectedCategory);
      setCommunityCategoryName(categoryName);
    },
    [selectedCategory, form]
  );

  const handleSubmitClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isSubmitting.current) {
        return;
      }

      form.handleSubmit(onSubmit)(e as unknown as React.FormEvent);
    },
    [form]
  );

  const onSubmit = async (data: PostFormData) => {
    if (isSubmitting.current || isPending) {
      return;
    }

    isSubmitting.current = true;

    try {
      const postData: CreateCommunityPostRequest = {
        title: data.title,
        content: data.content,
        category: data.category,
        communityCategoryName: data.communityCategoryName,
        communityCategoryDescription:
          data.category === "TEACHER" ? "교사 커뮤니티" : "예비교사 커뮤니티",
      };

      createPost(postData, {
        onSuccess: (response: CreateCommunityPostResponse) => {
          toast({
            title: "게시글 등록 완료",
            description: "게시글이 성공적으로 등록되었습니다.",
            variant: "default",
          });
          navigate(-1);
        },
        onError: (error) => {
          toast({
            title: "게시글 등록 실패",
            description:
              "게시글 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
            variant: "destructive",
          });
          isSubmitting.current = false;
        },
        onSettled: () => {
          isSubmitting.current = false;
        },
      });
    } catch (e) {
      toast({
        title: "오류 발생",
        description: "게시글 등록 요청을 처리하는 중 오류가 발생했습니다.",
        variant: "destructive",
      });
      isSubmitting.current = false;
    }
  };

  // 현재 카테고리에 해당하는 하위 카테고리 옵션
  const categoryOptions = getCategoryOptions(selectedCategory);

  return (
    <PageLayout
      title="원바원 | 커뮤니티"
      headerTitle=" "
      headerType="save"
      description="커뮤니티 게시글 작성"
      currentPath={URL_PATHS.COMMUNITY_POST_EDITOR}
      mainClassName="flex flex-col gap-6 pb-0 mb-28"
      hasBackButton={true}
      wrapperBg="white"
    >
      {isPending ? (
        <LoadingSpinner />
      ) : error ? (
        <Error type="element">
          {error instanceof Error
            ? error.message
            : "게시글 작성 중 오류가 발생했습니다."}
        </Error>
      ) : (
        <section className="p-5 flex flex-col gap-5">
          <h2 className="text-base text-primary-dark01 font-semibold">
            카테고리
          </h2>
          <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={
                      selectedCategoryName === option.value
                        ? "secondary"
                        : "default"
                    }
                    size="lg"
                    font="md"
                    shape="full"
                    onClick={(e) => handleCategoryButtonClick(option.value, e)}
                    type="button"
                    className="font-normal"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel className="text-base text-primary-dark01 font-semibold">
                        제목
                      </FormLabel>
                      <span className="font-semibold text-primary-normal02 text-xs">
                        *200자 이내
                      </span>
                    </div>
                    <FormControl>
                      <Input
                        font="md"
                        placeholder="제목을 입력해주세요"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel className="text-base text-primary-dark01 font-semibold">
                        내용
                      </FormLabel>
                      <span className="font-semibold text-primary-normal02 text-xs">
                        *200자 이내
                      </span>
                    </div>
                    <FormControl>
                      <Textarea
                        font="md"
                        padding="sm"
                        placeholder="자유롭게 내용을 작성해주세요. 
                        
• 불편할 수 있는 비속어 사용은 피해 주세요. 
• 상세하고 유익한 정보 공유는 좋지만, 사생활 침해나 명예훼손이 없도록 조심해주세요. 
• 커뮤니티 에티켓을 지키지 않으면 글이 삭제될 수 있어요."
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4 flex justify-end gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  type="button"
                  onClick={handleSubmitClick}
                  disabled={isPending || isSubmitting.current}
                >
                  {isPending ? "등록 중..." : "등록"}
                </Button>
              </div>
            </form>
          </Form>
        </section>
      )}
    </PageLayout>
  );
}
