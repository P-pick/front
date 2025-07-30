import type { TouristAttraction } from '@/entities/tour';

export default function TouristAttractionInfo(data: TouristAttraction) {
  return (
    <div>
      <h1>문의 및 안내: {data.infocenter}</h1>
      <h2>이용시간: {data.usetime}</h2>
      <p>쉬는날: {data.restdate}</p>
      <span>주차시설: {data.parking}</span>
    </div>
  );
}
