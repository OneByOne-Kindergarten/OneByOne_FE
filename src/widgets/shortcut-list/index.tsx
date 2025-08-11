import type { Shortcut } from "@/entities/shortcuts/DTO.d";
import { useShortcuts } from "@/entities/shortcuts/hooks/useShortcuts";
import Toggle from "@/shared/ui/buttons/base-toggle";
import ShortCutAddButton from "@/widgets/shortcut-list/ui/ShortCutAddButton";
import ShortCutButton from "@/widgets/shortcut-list/ui/ShortCutButton";

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
