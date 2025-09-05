import type { ReactNode } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface MetadataProviderProps {
  children: ReactNode;
}
const SITE_URL = 'https://p-pick.com/';

export default function MetadataProvider({ children }: MetadataProviderProps) {
  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | P-PICK"
        defaultTitle="P-PICK | 숏폼으로 즐기는 여행지 탐색"
      >
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="틱톡처럼 스와이프하며 새로운 여행지를 찾아보세요! P-PICK은 위치 기반으로 주변 관광지를 추천하고, 직관적인 UI로 재미있는 여행 탐색 경험을 제공합니다."
        />
        <meta
          name="keywords"
          content="여행, 관광, 숏폼, 여행지 추천, 국내 여행, 관광지 정보, 위치 기반, 스와이프, Tour API, P-PICK, 피픽"
        />
        <link rel="canonical" href={SITE_URL} />
        <link rel="icon" href="/meta-images/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/meta-images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/meta-images/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/meta-images/apple-touch-icon.png"
        />
        <link rel="manifest" href="/meta-images/site.webmanifest" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="P-PICK" />
        <meta
          property="og:title"
          content="P-PICK | 스와이프로 발견하는 나만의 여행지"
        />
        <meta
          property="og:description"
          content="숏폼처럼 위아래로 스와이프하며 국내의 숨은 관광 명소를 쉽고 재미있게 찾아보세요!"
        />
        <meta
          property="og:image"
          content={`${SITE_URL}/meta-images/trip.png`}
        />
        <meta property="og:url" content={SITE_URL} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="P-PICK | 스와이프로 발견하는 나만의 여행지"
        />
        <meta
          name="twitter:description"
          content="숏폼처럼 위아래로 스와이프하며 국내의 숨은 관광 명소를 쉽고 재미있게 찾아보세요!"
        />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/meta-images/trip.png`}
        />
      </Helmet>
      {children}
    </HelmetProvider>
  );
}
