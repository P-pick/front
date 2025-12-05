import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title: string;
  description?: string;
  imageUrl?: string;
  canonicalUrl?: string;
}

export default function Seo({
  title,
  description,
  imageUrl,
  canonicalUrl,
}: SeoProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name="keywords"
        content="여행, 관광, 지도, 길찾기, 네비게이션, 도보, 대중교통, 자동차, 여행지 추천, 주변 관광지 추천, 관광지 추천, 주변 놀거리, 놀거리 추천"
      />
      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}
      {imageUrl && (
        <>
          <meta property="og:image" content={imageUrl} />
          <meta name="twitter:image" content={imageUrl} />
        </>
      )}
      {canonicalUrl && (
        <>
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:url" content={canonicalUrl} />
        </>
      )}
      <meta property="og:title" content={`${title} | P-PICK`} />
      <meta name="twitter:title" content={`${title} | P-PICK`} />
    </Helmet>
  );
}
