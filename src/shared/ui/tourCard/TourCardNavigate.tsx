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
  onNavigate: React.Dispatch<React.SetStateAction<T>>;
}

export default function TourCardNavigate({
  currentSection,
  onNavigate,
}: TourCardNavigateProps<string>) {
  const getCurrentButtonClass = (isActive: boolean) => {
    return clsx('text-black text-sm font-bold px-4 py-2', {
      'border-b-2 border-blue-500': isActive,
    });
  };

  return (
    <div className="flex w-full justify-around border-b-2 border-gray-300">
      {TOUR_CARDS_NAVIGATE.map(item => (
        <button
          key={item.id}
          className={getCurrentButtonClass(currentSection === item.type)}
          onClick={() => onNavigate(item.type)}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
}
