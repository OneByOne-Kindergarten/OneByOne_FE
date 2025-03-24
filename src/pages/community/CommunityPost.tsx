import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { SVG_PATHS } from "@/constants/assets-path";
import Badge from "@/components/@shared/badge";
import Toggle from "@/components/@shared/buttons/base-toggle";
import Button from "@/components/@shared/buttons/base-button";
import AlertCard from "@/components/@shared/alert/alert-card";
import PageLayout from "@/components/@shared/layout/page-layout";
import { CATEGORY_LABELS } from "@/constants/community";
import type { Post } from "@/types/community";
import { formatDate } from "@/utils/dateUtils";
import { getMockPostDetail } from "@/services/mockApi";
import { getCommunityType, setCommunityState } from "@/utils/sessionStorage";

interface ExtendedPost extends Post {
  author: string;
  categoryType: "teacher" | "pre-teacher";
  category: string;
}

export default function CommunityPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<ExtendedPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [communityType, setCommunityTypeState] = useState<
    "teacher" | "pre-teacher"
  >(getCommunityType());

  // mockApi
  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    const postData = getMockPostDetail(id);

    if (postData) {
      setPost(postData as ExtendedPost);

      if (postData.categoryType) {
        setCommunityTypeState(postData.categoryType);

        // 세션 스토리지에 게시글 정보 저장 - 뒤로가기를 위한 커뮤니티 타입 및 카테고리 정보 유지
        const category = (postData as any).category || "top10";
        const communityState = {
          type: postData.categoryType,
          path: `/community?type=${postData.categoryType}${category ? `&category=${category}` : ""}`,
          category: category,
        };

        console.log("커뮤니티 게시글 상태 저장:", communityState);
        setCommunityState(communityState);
      }
    }

    setIsLoading(false);
  }, [id]);

  return (
    <PageLayout
      title={`원바원 | ${post?.title || "게시글"}`}
      description={`원바원 커뮤니티 게시글 - ${post?.title || ""}`}
      headerTitle="커뮤니티"
      currentPath={`/community/${id}`}
      mainBg="gray"
      mainClassName="flex flex-col gap-2 mb-24"
      hasBackButton={true}
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : post ? (
        <>
          <article className="px-5 pt-7 pb-4 bg-white flex flex-col gap-7">
            <section className="flex flex-col gap-2.5">
              <div className="flex gap-2 items-center">
                <Badge variant="secondary">
                  {CATEGORY_LABELS[post.category]}
                </Badge>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-2.5 items-center">
                  <div className="relative w-7 h-7 bg-primary-normal03 rounded-full">
                    <img
                      src={SVG_PATHS.CHARACTER.user}
                      alt="병아리 사용자 캐릭터"
                      className="absolute w-2/3 h-3/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                  <div>
                    <span className="text-primary-dark02 font-semibold text-sm">
                      {post.author}
                    </span>
                    <ul className="text-primary-normal03 text-xxs flex gap-1">
                      <li>{formatDate(post.createdAt)}</li>
                      <li>조회 {post.viewCount}</li>
                    </ul>
                  </div>
                </div>
                <img
                  src={SVG_PATHS.KEBAB}
                  alt="커뮤니티 게시글 옵션 메뉴"
                  width="20"
                  height="20"
                  className="mb-auto"
                />
              </div>
            </section>

            <section className="text-primary-dark01 flex flex-col gap-4">
              <div className="flex flex-col gap-2.5">
                <h2 className="font-semibold">{post.title}</h2>
                <p className="text-sm">{post.content}</p>
              </div>
              <AlertCard>
                비속어 및 특정 인물에 대한 명예훼손으로 간주되는 내용이 포함될
                경우 삭제될 수 있습니다.
              </AlertCard>
            </section>

            <section className="flex justify-between">
              <Toggle variant="transparent_gray" size="sm">
                좋아요 <span>{post.likeCount}</span>
              </Toggle>
              <Button variant="transparent_gray" size="sm" font="sm_sb">
                답글
              </Button>
              <Button variant="transparent_gray" size="sm" font="sm_sb">
                공유
              </Button>
            </section>
          </article>
          <section className="flex flex-col gap-2 p-5 bg-white">
            <div className="flex justify-between">
              <div className="flex gap-2.5 items-center">
                <div className="relative w-7 h-7 bg-primary-normal03 rounded-full">
                  <img
                    src={SVG_PATHS.CHARACTER.user}
                    alt="병아리 사용자 캐릭터"
                    className="absolute w-2/3 h-3/5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
                <div>
                  <span className="text-primary-dark02 font-semibold text-sm">
                    {post.author}
                  </span>
                  <ul className="text-primary-normal03 text-xxs flex gap-1">
                    <li>{formatDate(post.createdAt)}</li>
                  </ul>
                </div>
              </div>
              <img
                src={SVG_PATHS.KEBAB}
                alt="커뮤니티 게시글 옵션 메뉴"
                width="20"
                height="20"
                className="mb-auto"
              />
            </div>
            <p className="text-primary-dark01 text-sm">댓글 내용</p>
            <div className="flex justify-end gap-2">
              <Toggle variant="transparent_gray" size="sm" border="gray">
                좋아요 <span>{post.likeCount}</span>
              </Toggle>
              <Button
                variant="transparent_gray"
                size="sm"
                border="gray"
                shape="rounded"
                font="sm_sb"
              >
                답글
              </Button>
            </div>
          </section>
        </>
      ) : (
        <div className="m-5 flex justify-center items-center h-64">
          <p>게시글을 찾을 수 없습니다.</p>
        </div>
      )}
    </PageLayout>
  );
}
