import { useNavigate } from "react-router-dom";

import type { ReportTargetType } from "@/entities/report/DTO.d";
import { URL_PATHS } from "@/shared/constants/url-path";
import DropDown from "@/shared/ui/drop-down/base-drop-down";

interface ReviewReportDropDownProps {
  targetId: number;
  targetType: ReportTargetType;
}

// 다른 사람의 리뷰에는 신고하기 메뉴만 표시
export default function ReviewReportDropDown({
  targetId,
  targetType,
}: ReviewReportDropDownProps) {
  const navigate = useNavigate();

  const options = [
    {
      label: "신고하기",
      onClick: () =>
        navigate(`${URL_PATHS.REPORT}?targetId=${targetId}&type=${targetType}`),
    },
  ];

  return <DropDown options={options} position="bottom" align="end" />;
}
