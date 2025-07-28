import { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  hasNextPage: boolean;
  isFetching: boolean;
  onIntersect: () => void;
  LoadingComponent?: React.ReactNode;
  triggerClassName?: string;
}

export default function InfiniteScroll({
  hasNextPage,
  isFetching,
  onIntersect,
  LoadingComponent,
  triggerClassName = 'h-1',
}: InfiniteScrollProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          onIntersect();
        }
      },
      { threshold: 0.1 },
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, isFetching, onIntersect]);

  return (
    <>
      {isFetching && LoadingComponent}
      <div ref={observerRef} className={triggerClassName} />
    </>
  );
}
