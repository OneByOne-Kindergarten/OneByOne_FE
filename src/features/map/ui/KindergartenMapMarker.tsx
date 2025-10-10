import { CustomOverlayMap } from "react-kakao-maps-sdk";

import { getMarkerStyles } from "@/features/map/lib/getMarkerStyles";
import { SVG_PATHS } from "@/shared/constants/assets-path";

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
        className={`flex transform flex-col items-center transition-transform hover:scale-110 ${
          onClick ? "cursor-pointer" : ""
        }`}
        onClick={onClick}
        title={`${name} (${establishment || "기타"})`}
      >
        {/* 마커 아이콘 */}
        <div
          className={`${config.markerSize} flex items-center justify-center rounded-full border-2 shadow-xl`}
          style={{
            backgroundColor: styles.bgColor,
            borderColor: styles.borderColor,
            color: styles.textColor,
          }}
        >
          {styles.showIcon ? (
            <img
              src={SVG_PATHS.NAV.KINDERGARTEN.active}
              alt={establishment || "유치원"}
              className="h-4 w-4 invert"
            />
          ) : (
            <span className={`${config.textSize} font-semibold`}>
              {styles.text}
            </span>
          )}
        </div>

        {/* 화살표 */}
        <div
          className="h-0 w-0 border-l-2 border-r-2 border-t-4 border-transparent"
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
            className={`bg-white opacity-90 ${config.labelPadding} rounded shadow-md ${config.labelSize} mt-0.5 font-semibold ${config.labelMaxWidth} truncate`}
          >
            {name}
          </div>
        )}
      </div>
    </CustomOverlayMap>
  );
}
