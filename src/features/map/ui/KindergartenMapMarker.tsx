import { DivIcon } from "leaflet";
import { useMemo } from "react";
import { Marker } from "react-leaflet";

import { getMarkerStyles } from "@/features/map/lib/getMarkerStyles";

// ------------------------------------------------------------------------------

const MARKER_SIZE_CONFIG = {
  sm: {
    size: "w-6 h-6",
    text: "text-xs",
    label: "text-xs p-0.5 max-w-20",
  },
  md: {
    size: "w-8 h-8",
    text: "text-xs",
    label: "text-xs p-0.5 max-w-24",
  },
  lg: {
    size: "w-10 h-10",
    text: "text-sm",
    label: "text-sm px-2 py-1 max-w-32",
  },
} as const;

// 공식 문서 권장 방식
function createMarkerHtml({
  name,
  establishment,
  styles,
  config,
  showLabel,
  hasOnClick,
}: {
  name: string;
  establishment?: string;
  styles: ReturnType<typeof getMarkerStyles>;
  config: (typeof MARKER_SIZE_CONFIG)[keyof typeof MARKER_SIZE_CONFIG];
  showLabel: boolean;
  hasOnClick: boolean;
}): string {
  const arrowColor =
    styles.borderColor === "transparent" ? styles.bgColor : styles.borderColor;

  return `
    <div class="flex transform flex-col items-center transition-transform hover:scale-110 ${hasOnClick ? "cursor-pointer" : ""}"
         title="${name} (${establishment || "기타"})">
      <div class="${config.size} flex items-center justify-center rounded-full border-2 shadow-xl"
           style="background-color: ${styles.bgColor}; border-color: ${styles.borderColor}; color: ${styles.textColor}">
        <span class="${config.text} font-semibold">${styles.text}</span>
      </div>
      <div class="h-0 w-0 border-l-2 border-r-2 border-t-4 border-transparent"
           style="border-top-color: ${arrowColor}"></div>
      ${
        showLabel
          ? `<div class="bg-white opacity-90 ${config.label} rounded shadow-md mt-0.5 font-semibold truncate">${name}</div>`
          : ""
      }
    </div>
  `;
}

// ------------------------------------------------------------------------------

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
  const config = MARKER_SIZE_CONFIG[size];

  const markerHtml = createMarkerHtml({
    name,
    establishment,
    styles,
    config,
    showLabel,
    hasOnClick: !!onClick,
  });

  const customIcon = useMemo(
    () =>
      new DivIcon({
        html: markerHtml,
        className: "custom-kindergarten-marker",
        iconSize: [50, 70],
        iconAnchor: [25, 70],
      }),
    [markerHtml]
  );

  return (
    <Marker
      position={[latitude, longitude]}
      icon={customIcon}
      eventHandlers={{
        click: () => {
          if (onClick) onClick();
        },
      }}
    />
  );
}

// ------------------------------------------------------------------------------
interface KindergartenMarkerProps {
  latitude: number;
  longitude: number;
  name: string;
  establishment?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}
