import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

/**
 * 메타데이터 설정
 * @param title 페이지 제목
 * @param description 페이지 설명
 */

interface MetadataProps {
  title?: string;
  description: string;
}

export function useDocumentMetadata({ description }: { description: string }) {
  useEffect(() => {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    return () => {};
  }, [description]);
}

export default function Metadata({ title, description }: MetadataProps) {
  useDocumentMetadata({ description });

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
