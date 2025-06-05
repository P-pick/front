import { markerImageMap, markerList } from '@/pages/const/MARKER';
import type { AroundContentTypeId } from '../types';

interface AroundTouristNavigateProps {
  selectedContentTypeId: AroundContentTypeId;
  setSelectedContentTypeId: React.Dispatch<
    React.SetStateAction<AroundContentTypeId>
  >;
}

export default function AroundTouristNavigate({
  selectedContentTypeId,
  setSelectedContentTypeId,
}: AroundTouristNavigateProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-24 bg-amber-50 z-(--z-layer2) ">
      <ul className="flex justify-around items-center h-full">
        {markerList.map(marker => (
          <li key={marker.contentTypeId}>
            <img
              className="w-10 h-11"
              src={markerImageMap[marker.contentTypeId]}
              alt={marker.altText}
            />
            <button
              onClick={() => setSelectedContentTypeId(marker.contentTypeId)}
              className={
                selectedContentTypeId === marker.contentTypeId
                  ? 'text-blue-500'
                  : ''
              }
            >
              {marker.altText}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
