import { Link } from "react-router-dom";
import { useShortcuts } from "@/hooks/useShortcuts";
import { Shortcut } from "@/types/homeDTO";

export default function ShortCutList() {
  const { shortcuts, navigateToEdit } = useShortcuts();

  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold text-primary-dark02">
          원바원 바로가기
        </h1>
        <button
          onClick={navigateToEdit}
          className="text-sm text-primary-normal03 px-2 py-1 rounded-md hover:bg-gray-100"
        >
          편집하기
        </button>
      </div>
      <div className="flex gap-6">
        {shortcuts.map((shortcut: Shortcut) => (
          <div
            key={shortcut.name}
            className="flex flex-col items-center gap-1.5"
          >
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
          </div>
        ))}
        {shortcuts.length < 4 && (
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={navigateToEdit}
              className="w-14 h-14 rounded-full bg-primary-light02 flex items-center justify-center"
            >
              <span className="text-3xl text-primary-normal03 font-light">
                +
              </span>
            </button>
            <p className="text-sm text-primary-dark02">바로가기</p>
          </div>
        )}
      </div>
    </section>
  );
}
