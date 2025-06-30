import ShortCutButton from "@/components/home/ShortCutButton";
import ShortCutAddButton from "@/components/home/ShortCutAddButton";
import { useShortcuts } from "@/hooks/useShortcuts";
import type { Shortcut } from "@/types/homeDTO";

export default function ShortCutList() {
  const { shortcuts, navigateToEdit } = useShortcuts();

  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-primary-dark02">
          원바원 바로가기
        </h1>
        <button
          onClick={navigateToEdit}
          className="rounded-lg px-2 py-1 text-sm text-primary-normal03 hover:bg-gray-100"
        >
          편집하기
        </button>
      </div>
      <menu className="flex gap-6">
        {shortcuts?.map((shortcut: Shortcut) => (
          <ShortCutButton key={shortcut.name} shortcut={shortcut} />
        ))}
        {(!shortcuts || shortcuts.length < 4) && (
          <ShortCutAddButton navigateToEdit={navigateToEdit} />
        )}
      </menu>
    </section>
  );
}
