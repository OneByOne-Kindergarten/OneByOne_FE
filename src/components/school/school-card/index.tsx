import { SVG_PATHS } from "@/constants/assets-path";
import Badge from "@/components/@shared/badge";

interface SchoolCardProps {
  schoolName?: string;
  location?: string;
  score?: number;
  category?: string;
  id?: string;
}

export default function SchoolCard({
  schoolName = "기관 이름",
  location = "위치",
  score = 0,
  category = "설립 유형",
  id = "1",
}: SchoolCardProps) {
  return (
    <li className="px-5 py-4 bg-white">
      <button className="flex w-full justify-between items-center">
        <div className="flex flex-col gap-2.5">
          <Badge variant="default">{category}</Badge>
          <div className="gap-1">
            <p className="text-base font-bold ">{schoolName}</p>
            <div className="flex gap-1.5 ">
              <img
                src={SVG_PATHS.LOCATION}
                alt="위치 아이콘"
                width="18"
                height="18"
              />
              <span className="text-primary-normal03 text-sm font-medium">
                {location}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <img
            src={SVG_PATHS.START.yellow}
            alt="별점 아이콘"
            width="24"
            height="24"
          />
          <span className="text-base font-bold">{score}</span>
        </div>
      </button>
    </li>
  );
}
