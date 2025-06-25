import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { getMarkerStyles } from "@/utils/mapUtils";
import { SVG_PATHS } from "@/constants/assets-path";

interface KindergartenMarkerProps {
  latitude: number;
  longitude: number;
  name: string;
  establishment?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function KindergartenMarker({
  latitude,
  longitude,
  name,
  establishment,
  onClick,
  size = "md",
  showLabel = true,
}: KindergartenMarkerProps) {
  const styles = getMarkerStyles(establishment);

  const sizeConfig = {
    sm: {
      markerSize: "w-6 h-6",
      textSize: "text-xs",
      labelSize: "text-xs",
      labelPadding: "p-0.5",
      labelMaxWidth: "max-w-20",
    },
    md: {
      markerSize: "w-8 h-8",
      textSize: "text-xs",
      labelSize: "text-xs",
      labelPadding: "p-0.5",
      labelMaxWidth: "max-w-24",
    },
    lg: {
      markerSize: "w-10 h-10",
      textSize: "text-sm",
      labelSize: "text-sm",
      labelPadding: "px-2 py-1",
      labelMaxWidth: "max-w-32",
    },
  };

  const config = sizeConfig[size];

  return (
    <CustomOverlayMap position={{ lat: latitude, lng: longitude }} yAnchor={1}>
      <div
        className={`flex flex-col items-center transform hover:scale-110 transition-transform ${
          onClick ? "cursor-pointer" : ""
        }`}
        onClick={onClick}
        title={`${name} (${establishment || "기타"})`}
      >
        {/* 마커 아이콘 */}
        <div
          className={`${config.markerSize} rounded-full flex items-center justify-center shadow-lg border-2`}
          style={{
            backgroundColor: styles.bgColor,
            borderColor: styles.borderColor,
            color: styles.textColor,
          }}
        >
          {styles.showIcon ? (
            <img
              src={SVG_PATHS.SCHOOL.active}
              alt={establishment || "유치원"}
              className="w-4 h-4 invert"
            />
          ) : (
            <span className={`${config.textSize} font-semibold`}>
              {styles.text}
            </span>
          )}
        </div>

        {/* 화살표 */}
        <div
          className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent"
          style={{
            borderTopColor: styles.showIcon
              ? styles.bgColor
              : styles.borderColor === "transparent"
                ? styles.bgColor
                : styles.borderColor,
          }}
        />

        {/* 유치원 이름 라벨 */}
        {showLabel && (
          <div
            className={`opacity-90 bg-white ${config.labelPadding} rounded shadow-md ${config.labelSize} font-semibold mt-0.5 ${config.labelMaxWidth} truncate`}
          >
            {name}
          </div>
        )}
      </div>
    </CustomOverlayMap>
  );
}
