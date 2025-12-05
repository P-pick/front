import { tourQueries } from '@/entities/tour';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

interface UseKakaoShareParams {
  contentId: string;
  link: string;
}

const useKakaoShare = ({ contentId, link }: UseKakaoShareParams) => {
  const { data } = useQuery({
    ...tourQueries.detailCommon(contentId),
  });

  useEffect(() => {
    // SDK 로드
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const shareKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(import.meta.env.VITE_KAKAO_MAP_KEY);
      }
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: data?.title ?? '여행지 추천',
          description: data?.overview ?? '멋진 여행지를 확인해보세요!',
          imageUrl:
            data?.firstimage ||
            data?.firstimage2 ||
            'https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png',
          link: {
            mobileWebUrl: link,
            webUrl: link,
          },
        },
        buttons: [
          {
            title: '여행 시작하기',
            link: {
              mobileWebUrl: link,
              webUrl: link,
            },
          },
        ],
      });
    }
  };

  return { shareKakao };
};

export default useKakaoShare;
