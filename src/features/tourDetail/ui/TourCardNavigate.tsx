import clsx from 'clsx';

import { TOUR_CARDS_NAVIGATE } from '@/features/tourDetail';

type TourSectionType = (typeof TOUR_CARDS_NAVIGATE)[number]['type'];
interface TourCardNavigateProps<T extends TourSectionType> {
  currentSection: T;
  onNavigate: (section: T) => void;
}

export default function TourCardNavigate<T extends TourSectionType>({
  currentSection,
  onNavigate,
}: TourCardNavigateProps<T>) {
  const totalItems = TOUR_CARDS_NAVIGATE.length;
  const currentIndex = TOUR_CARDS_NAVIGATE.findIndex(
    item => item.type === currentSection,
  );

  const itemWidth = 100 / totalItems;

  return (
    <div className="relative w-full border-b-2 border-gray-300">
      <div className="flex">
        {TOUR_CARDS_NAVIGATE.map(item => (
          <button
            key={item.id}
            className="text-black text-sm font-bold px-4 py-2 flex-1"
            onClick={() => onNavigate(item.type as T)}
          >
            <span
              className={clsx(
                currentSection === item.type
                  ? 'text-[var(--color-primary)]'
                  : 'text-gray-500',
              )}
            >
              {item.title}
            </span>
          </button>
        ))}
      </div>
      <div
        className="absolute bottom-[-2px] h-0.5 bg-[var(--color-primary)] transition-all duration-300"
        style={{
          left: `${currentIndex * itemWidth + itemWidth / 2}%`,
          transform: 'translateX(-50%)',
          width: `${itemWidth}%`,
        }}
      />
    </div>
  );
}
