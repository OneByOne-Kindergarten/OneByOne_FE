import Toggle from "@/components/@shared/buttons/base-toggle";
import ShortCutAddButton from "@/components/home/ShortCutAddButton";
import ShortCutButton from "@/components/home/ShortCutButton";
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
        <Toggle
          onClick={navigateToEdit}
          font="sm"
          className="px-2 py-1 text-primary-normal03"
        >
          편집하기
        </Toggle>
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
