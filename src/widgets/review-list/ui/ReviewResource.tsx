import clsx from "clsx";
import { Link } from "react-router-dom";

import { SVG_PATHS } from "@/shared/constants/assets-path";

export default function ReviewResource({
  kindergartenId,
  kindergartenName,
  className,
}: {
  kindergartenId: string;
  kindergartenName: string;
  className?: string;
}) {
  return (
    <Link to={`/kindergarten/${kindergartenId}`}>
      <div
        className={clsx(
          "mt-3 flex justify-between rounded-lg bg-primary-foreground p-3 text-left hover:opacity-70 active:opacity-70",
          className
        )}
      >
        <p className="text-xs font-medium text-primary-dark02">
          {kindergartenName}
        </p>
        <img
          src={SVG_PATHS.ARROW.LIGHT}
          alt="오른쪽 방향 화살표"
          className="-rotate-90"
        />
      </div>
    </Link>
  );
}
