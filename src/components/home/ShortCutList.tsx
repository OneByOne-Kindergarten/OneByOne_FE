import { SVG_PATHS } from "@/constants/assets-path";

export default function ShortCutList() {
  return (
    <section className="flex flex-col gap-2.5">
      <h1 className="text-lg font-bold text-primary-dark02">원바원 바로가기</h1>
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-1">
          <button className="relative w-14 h-14 rounded-full bg-primary-light02">
            <img
              src={SVG_PATHS.SHORTCUT.school}
              alt="유치원 바로가기"
              width={38}
              height={42}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </button>
          <p className="text-sm text-primary-dark02">유치원찾기</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button className="relative w-14 h-14 rounded-full bg-primary-light02">
            <img
              src={SVG_PATHS.SHORTCUT.community}
              alt="커뮤니티 바로가기"
              width={36}
              height={28}
              className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2"
            />
          </button>
          <p className="text-sm text-primary-dark02">게시글작성</p>
        </div>
      </div>
    </section>
  );
}
