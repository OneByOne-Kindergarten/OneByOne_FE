import { useState } from "react";
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
import {
  PRE_TEACHER_POST_CATEGORIES,
  TEACHER_CATEGORIES,
  TEACHER_POST_CATEGORIES,
} from "@/constants/community";
import { URL_PATHS } from "@/constants/url-path";
import {
  getCategoryType,
  getCommunityType,
  setCommunityState,
} from "@/utils/lastVisitedPathUtils";
import { useCreatePost } from "@/hooks/useCommunity";
import { CreateCommunityPostResponse } from "@/types/communityDTO";
import Button from "@/components/@shared/buttons/base-button";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import Error from "@/components/@shared/layout/error";

const postSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
  category: z.enum(["TEACHER", "PRE_TEACHER"]),
});

type PostFormData = z.infer<typeof postSchema>;

export default function PostEditor() {
  const [communityType, setCommunityType] = useState<"teacher" | "pre-teacher">(
    getCommunityType()
  );
  const [selectedCategory, setSelectedCategory] =
    useState<string>(getCategoryType());

  const navigate = useNavigate();

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      category: selectedCategory as "TEACHER" | "PRE_TEACHER",
    },
  });

  // 게시글 작성
  const { mutate: createPost, isPending, error } = useCreatePost();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    form.setValue("category", category as "TEACHER" | "PRE_TEACHER");

    setCommunityState({
      category: category as "TEACHER" | "PRE_TEACHER",
    });
  };

  const onSubmit = (data: PostFormData) => {
    createPost(
      {
        title: data.title,
        content: data.content,
        category: data.category,
        communityCategoryName:
          data.category === "TEACHER" ? "교사" : "예비교사",
        communityCategoryDescription:
          data.category === "TEACHER"
            ? "교사를 위한 커뮤니티"
            : "예비교사를 위한 커뮤니티",
      },
      {
        onSuccess: (response: CreateCommunityPostResponse) => {
          navigate(`/community/${response.data.id}`);
        },
      }
    );
  };

  const categoryOptions =
    communityType === "pre-teacher"
      ? PRE_TEACHER_POST_CATEGORIES
      : TEACHER_POST_CATEGORIES;

  return (
    <PageLayout
      title="원바원 | 게시글 작성"
      headerTitle="게시글 작성"
      headerType="community"
      description="새로운 게시글을 작성합니다"
      currentPath={URL_PATHS.COMMUNITY_POST_EDITOR}
      mainClassName="flex flex-col gap-6 pb-0 mb-28"
      hasBackButton={true}
      wrapperBg="white"
    >
      {isPending ? (
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center">
          <Error type="element">
            {error instanceof Error
              ? error.message
              : "게시글 작성 중 오류가 발생했습니다."}
          </Error>
        </div>
      ) : (
        <section className="p-5 flex flex-col gap-5">
          <h2 className="text-base text-primary-dark01 font-semibold">
            카테고리
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={
                      selectedCategory === option.value
                        ? "secondary"
                        : "default"
                    }
                    size="lg"
                    font="md"
                    shape="full"
                    onClick={() => handleCategoryChange(option.value)}
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4 flex justify-end gap-3">
                <Button variant="secondary" size="md" type="submit">
                  등록
                </Button>
              </div>
            </form>
          </Form>
        </section>
      )}
    </PageLayout>
  );
}
