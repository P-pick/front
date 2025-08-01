import type {
  AroundContentTypeId,
  CultureFacility,
  FestivalEvent,
  Food,
  Leports,
  Lodging,
  Shopping,
  TourCourse,
  TouristAttraction,
} from '@/entities/tour';

type ContentTypeToInformationMap = {
  '12': TouristAttraction;
  '14': CultureFacility;
  '15': FestivalEvent;
  '25': TourCourse;
  '28': Leports;
  '32': Lodging;
  '38': Shopping;
  '39': Food;
};

const getTypedInformation = (
  contentTypeId: AroundContentTypeId,
  data: unknown,
): ContentTypeToInformationMap[T] => {
  return data as ContentTypeToInformationMap[T];
};

export default getTypedInformation;
