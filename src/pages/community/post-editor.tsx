import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import Button from "@/components/@shared/buttons/base-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/@shared/form";
import Input from "@/components/@shared/form/input";
import Textarea from "@/components/@shared/form/textarea";
import PageLayout from "@/components/@shared/layout/page-layout";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import { URL_PATHS } from "@/constants/url-path";
import { useCreatePost } from "@/hooks/useCommunity";
import { CreateCommunityPostRequest } from "@/types/communityDTO";
import {
  getCategoryOptions,
  getValidCategoryName,
} from "@/utils/categoryUtils";
import {
  getCommunityCategory,
  getCommunityCategoryName,
  setCommunityCategory,
  setCommunityCategoryName,
} from "@/utils/lastVisitedPathUtils";

const postSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
  category: z.enum(["TEACHER", "PROSPECTIVE_TEACHER"]),
  communityCategoryName: z.string(),
});

type PostFormData = z.infer<typeof postSchema>;

export default function PostEditorPage() {
  const isSubmitting = useRef(false);

  const [selectedCategory, _setSelectedCategory] = useState<
    "TEACHER" | "PROSPECTIVE_TEACHER"
  >(() => {
    const category = getCommunityCategory();
    return category || "TEACHER";
  });

  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(
    () => {
      const savedCategoryName = getCommunityCategoryName();
      return getValidCategoryName(savedCategoryName, selectedCategory);
    }
  );

  const navigate = useNavigate();
  const { mutate: createPost, isPending } = useCreatePost();

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

  // 상위 카테고리 변경 시 하위 카테고리 업데이트
  useEffect(() => {
    const currentCategoryName = form.getValues("communityCategoryName");

    // 하위 카테고리 유효성 검증
    const newCategoryName = getValidCategoryName(
      currentCategoryName,
      selectedCategory
    );

    // 새 카테고리가 선택된 경우에만 업데이트
    if (newCategoryName !== currentCategoryName) {
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

    const postData: CreateCommunityPostRequest = {
      title: data.title,
      content: data.content,
      category: data.category,
      communityCategoryName: data.communityCategoryName,
      communityCategoryDescription:
        data.category === "TEACHER" ? "교사 커뮤니티" : "예비교사 커뮤니티",
    };

    createPost(postData, {
      onSuccess: () => {
        navigate(-1);
      },
      onSettled: () => {
        isSubmitting.current = false;
      },
    });
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
      mainClassName="flex flex-col gap-6 pb-0 mt-14 mb-28"
      hasBackButton={true}
      wrapperBg="white"
    >
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <section className="flex flex-col gap-5 p-5">
          <h2 className="text-base font-semibold text-primary-dark01">
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
                render={({ field, fieldState }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel className="text-base font-semibold text-primary-dark01">
                        제목
                      </FormLabel>
                      <span className="text-xs font-semibold text-primary-normal02">
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
                        error={!!fieldState.error}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel className="text-base font-semibold text-primary-dark01">
                        내용
                      </FormLabel>
                      <span className="text-xs font-semibold text-primary-normal02">
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
                        error={!!fieldState.error}
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
