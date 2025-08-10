import React, { useEffect, useState } from 'react';

interface ImageHintProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  preloadStrategy?: 'preload' | 'prefetch' | 'none';
  loadingStrategy?: 'eager' | 'lazy';
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
}

/**
 * PrefetchImage
 *  @description  컴포넌트는 이미지의 사전 로드 및 로딩 전략을 관리합니다.
 *
 * @param imgProps - 이미지 속성
 * @param preloadStrategy - 이미지 사전 로드 방식 (preload, prefetch, none)
 *  - preload: 페이지 로드 시 이미지를 미리 로드합니다.
 *  - prefetch: 메모리가 남을 때 로드합니다 (페이지 전환시 최적화)
 * @param loadingStrategy - 이미지 로딩 방식 (eager, lazy)
 *  - eager: 이미지가 뷰포트에 들어오면 즉시 로드합니다.
 *  - lazy: 이미지가 뷰포트에 들어올 때까지 로드를 지연합니다.
 * @param fallback - 이미지 로딩 전 표시할 fallback 요소
 * @param errorFallback - 이미지 로드 실패 시 표시할 요소
 *
 * @example
 * <PrefetchImage
 *   src="/path/to/image.jpg"
 *   alt="Description of the image"
 *   preloadStrategy="preload"
 *   loadingStrategy="lazy"
 *   fallback={<div>Loading...</div>}
 *   errorFallback={<div>Error loading image</div>}
 * />
 */
export const ImageHint: React.FC<ImageHintProps> = ({
  src,
  alt = '',
  preloadStrategy = 'none',
  loadingStrategy = 'lazy',
  fallback = null,
  errorFallback = null,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src || preloadStrategy === 'none') return;

    const existingLink = document.querySelector(
      `link[rel="${preloadStrategy}"][href="${src}"]`,
    );
    if (existingLink) return;

    const link = document.createElement('link');
    link.rel = preloadStrategy;
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }, [src, preloadStrategy]);

  useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  if (error) return <>{errorFallback}</>;
  if (!loaded) return <>{fallback}</>;

  return <img src={src} alt={alt} loading={loadingStrategy} {...props} />;
};
