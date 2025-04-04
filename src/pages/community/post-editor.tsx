import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { URL_PATHS } from "@/constants/url-path";
import PageLayout from "@/components/@shared/layout/page-layout";
import Button from "@/components/@shared/buttons/base-button";
import {
  getCommunityType,
  getCategoryType,
  setCommunityState,
  getCommunityState,
} from "@/utils/lastVisitedPathUtils";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/@shared/form";
import Input from "@/components/@shared/form/input";
import Textarea from "@/components/@shared/form/textarea";
import {
  PRE_TEACHER_CATEGORIES,
  TEACHER_CATEGORIES,
} from "@/constants/community";

export default function PostEditor() {
  const form = useForm();
  const navigate = useNavigate();
  const [communityType, setCommunityType] = useState<"teacher" | "pre-teacher">(
    getCommunityType()
  );
  const [selectedCategory, setSelectedCategory] =
    useState<string>(getCategoryType());
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 현재 커뮤니티 타입에 맞는 카테고리 옵션 가져오기
  const categoryOptions = (
    communityType === "pre-teacher"
      ? PRE_TEACHER_CATEGORIES
      : TEACHER_CATEGORIES
  ).filter((option) => option.value !== "top10" && option.value !== "all");

  // lastVisitedPaths 업데이트
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    setCommunityState({
      category,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      title,
      content,
      category: selectedCategory,
      communityType,
    });

    navigate(`/community?type=${communityType}&category=${selectedCategory}`);
  };

  return (
    <PageLayout
      title="원바원 | 커뮤니티 글쓰기"
      description="원바원 커뮤니티 게시글 작성"
      currentPath={URL_PATHS.COMMUNITY}
      headerTitle=" "
      headerType="save"
      wrapperBg="white"
      hasBackButton={true}
    >
      <section className="p-5 flex flex-col gap-5">
        <h2 className="text-base text-primary-dark01 font-semibold">
          카테고리
        </h2>
        <Form {...form}>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((option) => (
              <Button
                key={option.value}
                variant={
                  selectedCategory === option.value ? "secondary" : "default"
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
                    size="sm"
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
            name="password"
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
        </Form>
      </section>
    </PageLayout>
  );
}
