import type {
  CultureFacility,
  FestivalEvent,
  Food,
  Leports,
  Lodging,
  Shopping,
  TourCourse,
  TouristAttraction,
} from '@/entities/tour';

type TourIntroMap = {
  '12': TouristAttraction;
  '14': CultureFacility;
  '15': FestivalEvent;
  '25': TourCourse;
  '28': Leports;
  '32': Lodging;
  '38': Shopping;
  '39': Food;
};

export function castTourIntro<K extends keyof TourIntroMap>(
  data: unknown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _typeId: K,
): TourIntroMap[K] {
  return data as TourIntroMap[K];
}
