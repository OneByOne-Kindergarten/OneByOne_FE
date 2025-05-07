import { BoxRatingGroup } from "@/components/@shared/rating/box-rating";

export type ReviewFieldConfig = {
  key: string;
  label: string;
};

interface ReviewContentProps {
  scores: Record<string, number>;
  contents: Record<string, string>;
  fieldConfigs: ReviewFieldConfig[];
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function ReviewContent({
  scores,
  contents,
  fieldConfigs,
  isExpanded,
  onToggleExpand,
}: ReviewContentProps) {
  const truncateText = (text: string, maxLength: number = 40) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + " …";
  };

  return (
    <>
      <ul className="flex flex-col gap-3">
        {fieldConfigs.map((config) => {
          const score = scores[config.key] || 0;
          const content = contents[config.key] || "";

          return (
            <li key={config.key} className="flex flex-col gap-1.5 text-xs">
              <div className="flex items-center">
                <h3 className="font-semibold w-14">{config.label}</h3>
                <BoxRatingGroup value={score} size="xs" className="gap-0.5" />
              </div>
              <p className={isExpanded ? "" : "line-clamp-1"}>
                {isExpanded ? content : truncateText(content)}
              </p>
            </li>
          );
        })}
      </ul>
      <button
        onClick={onToggleExpand}
        className="text-primary-normal03 text-xs text-left underline font-semibold"
      >
        {isExpanded ? "접기" : "더보기"}
      </button>
    </>
  );
}
