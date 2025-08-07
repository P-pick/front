// LocationPermissionOverlay.tsx
import { useState, type SVGProps } from 'react';
import clsx from 'clsx';

interface LocationPermissionOverlayProps {
  isDenied: boolean;
}

export default function LocationPermissionOverlay({
  isDenied,
}: LocationPermissionOverlayProps) {
  const [open, setOpen] = useState(isDenied);

  if (!open) return null;

  const handleClose = () => setOpen(false);

  return (
    <div
      role="dialog"
      aria-live="polite"
      className={clsx(
        'absolute inset-0 z-[var(--z-layer9)] bg-black/50 backdrop-blur-[2px]',
        'flex items-center justify-center cursor-pointer select-none',
        'transition-opacity duration-200 ease-out',
      )}
      onClick={handleClose}
    >
      <button
        aria-label="오버레이 닫기"
        className={clsx(
          'absolute top-4 right-4 rounded-full bg-white/90  shadow px-2.5 py-1.5',
          'text-sm leading-none ring-1 ring-black/10',
          'hover:bg-white active:scale-95 transition',
        )}
        onClick={e => {
          e.stopPropagation();
          handleClose();
        }}
      >
        닫기 ✕
      </button>

      <div
        className={clsx(
          'mx-4 w-full max-w-[560px] rounded-2xl bg-white shadow-2xl',
          'border border-black/5 p-5 md:p-6 text-center',
          'animate-[popIn_180ms_ease-out]',
        )}
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-base md:text-lg font-semibold text-gray-900">
          정확한 주변 정보를 위해 위치 권한을 켜주세요
        </h3>
        <p className="mt-2 text-sm md:text-[15px] text-gray-600">
          현재는 기본 위치로 보여드리고 있어요. 권한을 허용하면 더 가까운 장소를
          정확히 추천해 드려요.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 ring-1 ring-gray-200">
          <ArrowDownBounceIcon className="h-3.5 w-3.5" />
          화면을 탭하면 닫혀요
        </div>
      </div>
    </div>
  );
}

function ArrowDownBounceIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={`animate-bounce ${props.className ?? ''}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      {...props}
    >
      <path
        d="M12 5v14m0 0l-5-5m5 5l5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
