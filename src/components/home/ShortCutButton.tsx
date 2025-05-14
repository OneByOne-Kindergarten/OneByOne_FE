import { Link } from "react-router-dom";
import type { Shortcut } from "@/types/homeDTO";

export default function ShortCutButton({ shortcut }: { shortcut: Shortcut }) {
  return (
    <li key={shortcut.name} className="flex flex-col items-center gap-1.5">
      <Link
        to={shortcut.link}
        className="relative w-14 h-14 rounded-full bg-primary-light01 flex items-center justify-center"
      >
        <img
          src={shortcut.iconName}
          alt={`${shortcut.name} 바로가기`}
          width={38}
          height={42}
          className="absolute top-1/2  left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </Link>
      <p className="max-w-14 text-center text-xs line-clamp-1 text-pretty text-primary-dark02">
        {shortcut.name}
      </p>
    </li>
  );
}
