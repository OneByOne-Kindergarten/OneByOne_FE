import { Link } from "react-router-dom";

import type { Shortcut } from "@/types/homeDTO";

export default function ShortCutButton({ shortcut }: { shortcut: Shortcut }) {
  return (
    <li key={shortcut.name} className="flex flex-col items-center gap-1.5">
      <Link
        to={shortcut.link}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary-light01"
      >
        <img
          src={shortcut.iconName}
          alt={`${shortcut.name} 바로가기`}
          width={32}
          height={32}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </Link>
      <p className="line-clamp-1 max-w-14 text-pretty text-center text-xs text-primary-dark02">
        {shortcut.name}
      </p>
    </li>
  );
}
