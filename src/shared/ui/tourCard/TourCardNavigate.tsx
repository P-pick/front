import clsx from 'clsx';

const TOUR_CARDS_NAVIGATE = [
  {
    id: 1,
    type: 'overview',
    title: '정보',
  },
  {
    id: 2,
    type: 'review',
    title: '리뷰',
  },
];

interface TourCardNavigateProps<T> {
  currentSection: T;
  onNavigate: (section: T) => void;
}

export default function TourCardNavigate({
  currentSection,
  onNavigate,
}: TourCardNavigateProps<string>) {
  return (
    <div className="relative w-full border-b-2 border-gray-300">
      <div className="flex justify-around">
        {TOUR_CARDS_NAVIGATE.map(item => (
          <button
            key={item.id}
            className="text-black text-sm font-bold px-4 py-2"
            onClick={() => onNavigate(item.type)}
          >
            <span
              className={clsx(
                currentSection === item.type
                  ? 'text-(--color-primary)'
                  : 'text-gray-500',
              )}
            >
              {item.title}
            </span>
          </button>
        ))}
      </div>
      <div
        className="absolute bottom-[-2px] h-0.5 bg-(--color-primary) transition-all duration-300"
        style={{
          left:
            currentSection === 'overview'
              ? '25%'
              : currentSection === 'review'
                ? '75%'
                : '25%',
          transform: 'translateX(-50%)',
          width: '50%',
        }}
      />
    </div>
  );
}
