import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setReviewState } from "@/utils/sessionStorage";
import PostButton from "@/components/@shared/buttons/post-button";
import Toggle from "@/components/@shared/buttons/base-toggle";
import { SVG_PATHS } from "@/constants/assets-path";
import { REVIEW_TYPES } from "@/constants/review";

interface ReviewLayoutProps {
  type: "work" | "learning";
}

export default function ReviewLayout({ type }: ReviewLayoutProps) {
  const { id } = useParams<{ id: string }>();
  const safeId = id || "unknown";
  const navigate = useNavigate();

  // 경로 저장
  useEffect(() => {
    const currentPath = `/school/${safeId}/review?type=${type}`;
    setReviewState({
      path: currentPath,
      type: type,
    });
  }, [safeId, type]);

  const handleWriteReview = () => {
    const redirectPath = `/school/${safeId}/review/new?type=${type}`;
    console.log("Navigating to:", redirectPath);
    navigate(redirectPath);
  };

  return (
    <>
      {type === REVIEW_TYPES.WORK ? (
        <>
          <section className="pb-5 px-5 pt-6 flex flex-col bg-white gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex gap-1 text-lg font-bold">
                <p>리뷰</p>
                <span className="text-tertiary-3">12</span>
              </div>
              <div className="px-2 w-full py-4 bg-primary-foreground mx-auto rounded-lg flex items-center justify-evenly">
                <div className="flex flex-col items-center justify-center">
                  <p className="font-bold text-3xl">5.0</p>
                  <div>★★★★★</div>
                </div>
                <hr className="w-px h-20 bg-primary-normal01" />
                <ul className="flex flex-col font-semibold text-xs w-1/2">
                  <li className="flex gap-3 text-primary-normal02">
                    <p className="flex-1">복지/급여</p>
                    <div className="flex w-3/5 items-center gap-3">
                      <progress value={5} max={10} />
                      <span>5.0</span>
                    </div>
                  </li>
                  <li className="flex text-primary-normal02">
                    <p className="flex-1">워라벨</p>
                    <div className="flex w-3/5 items-center gap-3">
                      <progress value={5} max={10} />
                      <span>5.0</span>
                    </div>
                  </li>
                  <li className="flex text-primary-normal02">
                    <p className="flex-1">분위기</p>
                    <div className="flex w-3/5 items-center gap-3">
                      <progress value={5} max={10} />
                      <span>5.0</span>
                    </div>
                  </li>
                  <li className="flex flex-1 justify-between text-primary-normal02">
                    <p className="flex-1">관리자</p>
                    <div className="flex w-3/5 items-center gap-3">
                      <progress value={5} max={10} />
                      <span>5.0</span>
                    </div>
                  </li>
                  <li className="flex justify-between text-primary-normal02">
                    <p className="flex-1">고객</p>
                    <div className="flex w-3/5 items-center gap-3">
                      <progress value={5} max={10} />
                      <span>5.0</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white flex flex-col gap-5 px-5 py-4 mb-16 mt-2 border-b border-b-primary-normal01">
            <div className="flex justify-between border-b border-b-primary-normal01 pb-4">
              <div className="flex gap-2.5">
                <Toggle variant="default" size="sm">
                  <div className="w-2 h-2 rounded-full bg-star" />{" "}
                  <span className="font-semibold text-xs">추천순</span>
                </Toggle>
                <Toggle variant="default" size="sm">
                  <div className="w-2 h-2 rounded-full bg-primary-normal03 " />{" "}
                  <span className="font-semibold text-primary-normal03 text-xs">
                    최신순
                  </span>
                </Toggle>
              </div>
              <div className="gap-2 py-1 p-3 rounded-sm bg-primary-foreground text-primary-dark01 font-semibold flex items-center">
                <img src={SVG_PATHS.STAR.darkgray} alt="드롭다운 아이콘" />
                <p className="text-sm">드롭다운</p>
              </div>
            </div>
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <div>★★★★★</div>
                  <span className="text-sm font-semibold">4.5</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="font-semibold">리뷰 제목</h2>
                  <p className="text-xxs text-primary-normal03">
                    <span>worktype</span> | <span>작성일</span> |{" "}
                    <span>근무기간</span>
                  </p>
                </div>
              </div>
              <ul className="flex flex-col gap-2.5">
                <li className="flex flex-col gap-1 text-xs">
                  <div className="flex gap-2 items-center">
                    <h3 className="font-semibold">복지/급여</h3>
                    <div>■■■■■</div>
                  </div>
                  <p>내용</p>
                </li>
                <li className="flex flex-col gap-1 text-xs">
                  <div className="flex gap-2 items-center">
                    <h3 className="font-semibold">워라벨</h3>
                    <div>■■■■■</div>
                  </div>
                  <p>내용</p>
                </li>
                <li className="flex flex-col gap-1 text-xs">
                  <div className="flex gap-2 items-center">
                    <h3 className="font-semibold">분위기</h3>
                    <div>■■■■■</div>
                  </div>
                  <p>내용</p>
                </li>
                <li className="flex flex-col gap-1 text-xs">
                  <div className="flex gap-2 items-center">
                    <h3 className="font-semibold">관리자</h3>
                    <div>■■■■■</div>
                  </div>
                  <p>내용</p>
                </li>
                <li className="flex flex-col gap-1 text-xs">
                  <div className="flex gap-2 items-center">
                    <h3 className="font-semibold">고객</h3>
                    <div>■■■■■</div>
                  </div>
                  <p>내용</p>
                </li>
              </ul>
              <div className="text-primary-normal03 text-xs underline font-semibold">
                더보기
              </div>
            </div>
          </section>
        </>
      ) : (
        // 실습 리뷰 콘텐츠
        <section className="p-5 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">학교 실습 리뷰</h2>
            <div className="p-5 bg-gray-light01 rounded-lg">
              <p className="text-primary-normal02">
                실습 리뷰 콘텐츠가 추가될 예정입니다.
              </p>
            </div>
          </div>
        </section>
      )}
      <PostButton onClick={handleWriteReview} label="리뷰쓰기" />
    </>
  );
}
