import { useQuery } from "@tanstack/react-query";

import { INQUIRY_CACHE_CONFIG } from "@/shared/config/query";

import { getAllInquiries } from "../api";
import { InquiryResponse } from "../DTO.d";

export function useAllInquiries() {
  return useQuery<InquiryResponse>({
    queryKey: ["inquiries"],
    queryFn: () =>
      getAllInquiries({
        page: 0,
        size: 1,
        sort: "",
      }),
    ...INQUIRY_CACHE_CONFIG,
  });
}
