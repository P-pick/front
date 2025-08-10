import { reviewOptions } from '@/entities/review';
import { ImageHint } from '@/shared';
import { useQuery } from '@tanstack/react-query';

interface ReviewSwiperImageProps {
  src: string;
}

export default function ReviewSwiperImage({ src }: ReviewSwiperImageProps) {
  const downloadURL = useQuery(reviewOptions.getImage({ src })).data;

  return (
    <ImageHint
      preloadStrategy="prefetch"
      loadingStrategy="lazy"
      fallback={<div className="w-60 h-30 bg-gray-200 animate-pulse" />}
      errorFallback={
        <img
          src="/common/fallback.webp"
          className="w-60 h-30"
          alt="error-fallback-image"
        />
      }
      src={downloadURL}
      alt={`${src}`}
      className="w-60 max-h-30 min-h-30 object-cover p-2"
    />
  );
}
