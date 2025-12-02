import { useAtomValue } from "jotai";
import { ReactNode } from "react";

import { leafletMapErrorAtom } from "@/entities/kindergarten/model";
import MapError from "@/features/map/ui/MapError";

interface LeafletMapWrapperProps {
  children: ReactNode;
  height?: string;
}

export default function LeafletMapWrapper({
  children,
  height = "h-80",
}: LeafletMapWrapperProps) {
  const mapError = useAtomValue(leafletMapErrorAtom);

  if (mapError) {
    return <MapError height={height} error={mapError} />;
  }

  return <div className={`${height} relative w-full`}>{children}</div>;
}
