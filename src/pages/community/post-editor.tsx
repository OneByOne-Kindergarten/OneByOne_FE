import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { CreateCommunityPostRequest } from "@/entities/community/DTO.d";
import { useCreatePost } from "@/entities/community/hooks";
import InputField from "@/features/form/ui/fields/InputField";
import TextareaField from "@/features/form/ui/fields/TextareaField";
import ToggleChoicesField from "@/features/form/ui/fields/ToggleChoicesField";
import SubmitButton from "@/features/form/ui/SubmitButton";
import { URL_PATHS } from "@/shared/constants/url-path";
import { Form } from "@/shared/ui/form";
import PageLayout from "@/shared/ui/layout/page-layout";
import LoadingSpinner from "@/shared/ui/loading/loading-spinner";
import {
  getCategoryOptions,
  getValidCategoryName,
} from "@/shared/utils/categoryUtils";
import {
  getCommunityCategory,
  getCommunityCategoryName,
  setCommunityCategory,
  setCommunityCategoryName,
} from "@/shared/utils/lastVisitedPathUtils";
import {
  POST_CONTENT_MAX_LENGTH,
  POST_TITLE_MAX_LENGTH,
  postSchema,
} from "@/shared/utils/validationSchemas";

type PostFormData = z.infer<typeof postSchema>;

export default function CommunityPostEditorPage() {
  const navigate = useNavigate();
  const { mutate: createPost, isPending } = useCreatePost();
  const isSubmitting = useRef(false);
  const [selectedCategory] = useState<"TEACHER" | "PROSPECTIVE_TEACHER">(() => {
    const category = getCommunityCategory();
    return category || "TEACHER";
  });
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(
    () => {
      const savedCategoryName = getCommunityCategoryName();
      return getValidCategoryName(savedCategoryName, selectedCategory);
    }
  );

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      category: selectedCategory,
      communityCategoryName: selectedCategoryName,
    },
    mode: "onChange",
  });

  const { formState } = form;

  // 상위 카테고리 변경 시 하위 카테고리 업데이트
  useEffect(() => {
    const currentCategoryName = form.getValues("communityCategoryName");

    const newCategoryName = getValidCategoryName(
      currentCategoryName,
      selectedCategory
    );

    if (newCategoryName !== currentCategoryName) {
      setSelectedCategoryName(newCategoryName);
      form.setValue("communityCategoryName", newCategoryName);
    }

    form.setValue("category", selectedCategory);
    setCommunityCategory(selectedCategory);

    if (newCategoryName !== currentCategoryName) {
      setCommunityCategoryName(newCategoryName);
    }
  }, [selectedCategory, form]);

  const handleCommunityCategoryChange = useCallback(
    (categoryName: string) => {
      setSelectedCategoryName(categoryName);

      if (form.getValues("category") !== selectedCategory) {
        form.setValue("category", selectedCategory, {
          shouldDirty: true,
          shouldValidate: false,
        });
      }

      setCommunityCategory(selectedCategory);
      setCommunityCategoryName(categoryName);
    },
    [selectedCategory, form]
  );

  // 버튼 핸들러 없이 폼 제출 이벤트로만 처리
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

  const categoryOptions = getCategoryOptions(selectedCategory);

  return (
    <PageLayout
      title="원바원 | 커뮤니티"
      headerTitle=" "
      description="커뮤니티 게시글 작성"
      currentPath={URL_PATHS.COMMUNITY_POST_EDITOR}
      mainClassName="flex gap-6 pb-0 mt-14 h-[calc(100vh-4rem)]"
      hasBackButton={true}
      wrapperBg="white"
      isGlobalNavBar={false}
    >
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <section className="flex w-full flex-1 p-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-1 flex-col justify-between gap-6"
            >
              <div className="space-y-6">
                <ToggleChoicesField
                  control={form.control}
                  name="communityCategoryName"
                  label="카테고리"
                  options={categoryOptions.map((opt) => ({
                    label: opt.label,
                    value: opt.value,
                  }))}
                  onChange={handleCommunityCategoryChange}
                />

                <InputField
                  control={form.control}
                  name="title"
                  label="제목"
                  placeholder="제목을 입력해주세요"
                  showCounter
                  maxLength={POST_TITLE_MAX_LENGTH}
                />

                <TextareaField
                  control={form.control}
                  name="content"
                  label="내용"
                  placeholder={`자유롭게 내용을 작성해주세요. 

• 불편할 수 있는 비속어 사용은 피해 주세요. 
• 상세하고 유익한 정보 공유는 좋지만, 사생활 침해나 명예훼손이 없도록 조심해주세요. 
• 커뮤니티 에티켓을 지키지 않으면 글이 삭제될 수 있어요.`}
                  showCounter
                  maxLength={POST_CONTENT_MAX_LENGTH}
                />
              </div>
              <div className="mt-auto flex justify-end">
                <SubmitButton
                  label="등록"
                  disabled={
                    isPending || isSubmitting.current || !formState.isValid
                  }
                  className="w-20 font-semibold"
                />
              </div>
            </form>
          </Form>
        </section>
      )}
    </PageLayout>
  );
}
