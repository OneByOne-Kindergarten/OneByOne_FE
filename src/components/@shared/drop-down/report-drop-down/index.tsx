import { useNavigate } from "react-router-dom";
import { URL_PATHS } from "@/constants/url-path";

import DropDown from "@/components/@shared/drop-down/base-drop-down";

interface ReportDropDownProps {
  targetId: number;
}

export default function ReportDropDown({ targetId }: ReportDropDownProps) {
  const navigate = useNavigate();

  return (
    <DropDown
      options={[
        {
          label: "신고하기",
          onClick: () => navigate(`${URL_PATHS.REPORT}?targetId=${targetId}`),
        },
      ]}
      position="bottom"
      align="end"
    />
  );
}
