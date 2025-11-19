import { IMAGE_PATHS } from "@/shared/constants/assets-path";
import { URL_PATHS } from "@/shared/constants/url-path";
import PageLayout from "@/shared/ui/layout/page-layout";

const SHARE_GUIDE_STEPS = [
  {
    id: 1,
    title: "공유하고 싶은 정보를 찾으셨나요?",
    description:
      "리뷰, 커뮤니티 글, 유치원 정보 페이지에서 [공유하기] 버튼을 눌러보세요.",
  },
  {
    id: 2,
    title: "버튼을 누르고 바로 전송!",
    description: "개인 또는 단체방으로 간편하게 보낼 수 있어요.",
  },
  {
    id: 3,
    title: "함께 보면 더 도움이 돼요",
    description:
      "동료 선생님들과 공유하면 더 많은 분들이 도움을 받을 수 있어요.",
  },
];

// ------------------------------------------------------------------------------

export default function SharePage() {
  return (
    <PageLayout
      title="원바원 | 리뷰 공유 가이드"
      description="유치원 리뷰 카카오톡으로 공유하기"
      currentPath={URL_PATHS.LANDING_SHARE}
      headerLogo={true}
      isGlobalNavBar={false}
      headerHasBorder={false}
      wrapperBg="white"
      mainClassName="mt-16 flex flex-col pb-0"
    >
      <h1 className="sr-only">유치원 리뷰 카카오톡으로 공유하기</h1>

      <section
        className="bg-tertiary-2.5 w-full rounded-b-3xl px-9"
        aria-labelledby="share-guide-image"
      >
        <span id="share-guide-image" className="sr-only">
          유치원 리뷰 공유 가이드 이미지
        </span>
        <div className="relative mx-auto w-full max-w-96 translate-y-5">
          <img
            src={IMAGE_PATHS.LANDING.SHARE}
            alt="유치원 리뷰 공유 가이드 이미지"
            className="object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      <section
        className="mx-auto w-full space-y-7 px-11 py-10 text-primary-dark02"
        aria-labelledby="share-guide-content"
      >
        <h2
          id="share-guide-content"
          className="text-tertiary-4 text-pretty text-center text-lg font-semibold tracking-tighter"
        >
          공유하기 기능, 이렇게 활용해보세요!
        </h2>
        <ol className="mx-auto flex flex-col gap-5">
          {SHARE_GUIDE_STEPS.map(({ id, title, description }) => (
            <li key={id} className="flex gap-3 tracking-tighter">
              <span
                className="text-tertiary-4 bg-tertiary-1.5 mt-0.5 h-fit rounded-full px-1.5 text-sm font-medium"
                aria-hidden="true"
              >
                {id}
              </span>
              <div className="space-y-1">
                <h3 className="font-medium text-primary">{title}</h3>
                <p className="text-xs text-primary-dark01">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </PageLayout>
  );
}
