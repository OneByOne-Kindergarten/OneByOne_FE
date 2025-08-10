import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

/**
 * 메타데이터 설정
 * @param title 페이지 제목
 * @param description 페이지 설명
 * @param ogImage 오픈 그래프 이미지 URL
 * @param ogUrl 페이지 URL
 */

interface MetadataProps {
  title?: string;
  description: string;
  ogImage?: string;
  ogUrl?: string;
}

export function useDocumentMetadata({
  description,
  ogImage,
  ogUrl,
}: {
  description: string;
  ogImage?: string;
  ogUrl?: string;
}) {
  useEffect(() => {
    // Description 메타 태그 업데이트
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute("content", description);

    // Open Graph Description 업데이트
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    }

    // Twitter Description 업데이트
    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]'
    );
    if (twitterDescription) {
      twitterDescription.setAttribute("content", description);
    }

    // Open Graph Image 업데이트
    if (ogImage) {
      const ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (ogImageMeta) {
        ogImageMeta.setAttribute("content", ogImage);
      }

      const twitterImageMeta = document.querySelector(
        'meta[name="twitter:image"]'
      );
      if (twitterImageMeta) {
        twitterImageMeta.setAttribute("content", ogImage);
      }
    }

    // Open Graph URL 업데이트
    if (ogUrl) {
      const ogUrlMeta = document.querySelector('meta[property="og:url"]');
      if (ogUrlMeta) {
        ogUrlMeta.setAttribute("content", ogUrl);
      }
    }

    return () => {};
  }, [description, ogImage, ogUrl]);
}

export default function Metadata({
  title,
  description,
  ogImage,
  ogUrl,
}: MetadataProps) {
  useDocumentMetadata({ description, ogImage, ogUrl });

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {ogImage && (
        <>
          <meta property="og:image" content={ogImage} />
          <meta name="twitter:image" content={ogImage} />
        </>
      )}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      {title && (
        <>
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
        </>
      )}
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
