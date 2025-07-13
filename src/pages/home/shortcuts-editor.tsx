import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "@/components/@shared/layout/page-layout";
import LoadingSpinner from "@/components/@shared/loading/loading-spinner";
import ShortCutOption from "@/components/home/ShortCutOption";
import { shortcutOptions } from "@/constants/shortcutOptions";
import { URL_PATHS } from "@/constants/url-path";
import { useShortcuts } from "@/hooks/useShortcuts";
import { useToast } from "@/hooks/useToast";
import type { Shortcut } from "@/types/homeDTO";

export default function ShortcutsEditorPage() {
  const { shortcuts: initialShortcuts, updateShortcuts } = useShortcuts();
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialShortcuts?.length > 0) {
      setShortcuts([...initialShortcuts]);
    }
  }, [initialShortcuts]);

  const handleSave = async () => {
    if (!shortcuts || shortcuts.length === 0) {
      toast({
        title: "최소 1개 이상의 바로가기를 선택해주세요",
        variant: "destructive",
      });
      return;
    }

    if (shortcuts.length > 4) {
      toast({
        title: "바로가기는 최대 4개까지 추가할 수 있습니다",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const success = await updateShortcuts(shortcuts);

      if (success) {
        toast({
          title: "바로가기가 저장되었습니다",
        });
        navigate(URL_PATHS.HOME);
      }
    } catch (err) {
      toast({
        title: "바로가기 저장에 실패했습니다",
        variant: "destructive",
      });
      console.error("바로가기 저장 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (preset: Shortcut) => {
    // 이미 같은 링크를 가진 바로가기가 있는지 확인
    const existingIndex = shortcuts.findIndex(
      (item) => item.link === preset.link
    );

    if (existingIndex !== -1) {
      // 이미 추가된 바로가기 취소
      const newShortcuts = [...shortcuts];
      newShortcuts.splice(existingIndex, 1);
      setShortcuts(newShortcuts);
      return;
    }

    if (shortcuts.length >= 4) {
      toast({
        title: "바로가기는 최대 4개까지 추가할 수 있습니다",
        variant: "destructive",
      });
      return;
    }

    setShortcuts([...shortcuts, { ...preset }]);
  };

  const isShortcutAdded = (link: string) => {
    return shortcuts.some((shortcut) => shortcut.link === link);
  };

  const isMaxShortcuts = shortcuts.length >= 4;

  return (
    <PageLayout
      headerLogo={true}
      currentPath={URL_PATHS.HOME}
      headerTitle="바로가기 편집"
      wrapperBg="white"
      mainClassName="flex flex-col gap-4 px-5 py-4 mt-16 mb-24"
      onSave={isLoading ? undefined : handleSave}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <section className="flex flex-col gap-1">
            <h2 className="font-bold text-primary-dark02">
              원바원 바로가기{" "}
              <span className="text-primary-normal03">
                (<span className="text-primary-dark02">{shortcuts.length}</span>
                /4)
              </span>
            </h2>
            <p className="text-xs text-primary-normal03">
              자주 쓰는 기능을 직접 골라 홈화면에 설정할 수 있어요.
            </p>
          </section>

          <section className="mt-2 flex flex-col gap-3">
            {shortcutOptions.map((option, index) => {
              const isAdded = isShortcutAdded(option.link);
              const isDisabled = isMaxShortcuts && !isAdded;

              return (
                <ShortCutOption
                  key={index}
                  option={option}
                  isAdded={isAdded}
                  isDisabled={isDisabled}
                  onClick={() => handleSelectPreset(option)}
                />
              );
            })}
          </section>
        </>
      )}
    </PageLayout>
  );
}
