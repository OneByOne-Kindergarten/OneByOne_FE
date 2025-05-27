import { useNavigate } from "react-router-dom";
import { URL_PATHS } from "@/constants/url-path";
import type { ReportTargetType } from "@/types/reportDTO";
import DropDown from "@/components/@shared/drop-down/base-drop-down";

interface ReportDropDownProps {
  targetId: number;
  targetType: ReportTargetType;
}

export default function ReportDropDown({ targetId, targetType }: ReportDropDownProps) {
  const navigate = useNavigate();

  return (
    <DropDown
      options={[
        {
          label: "신고하기",
          onClick: () =>
            navigate(`${URL_PATHS.REPORT}?targetId=${targetId}&type=${targetType}`),
        },
      ]}
      position="bottom"
      align="end"
    />
  );
}
