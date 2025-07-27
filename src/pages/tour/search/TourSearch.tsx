import { SearchContainer } from '@/features/tourSearch';
import { Header } from '@/widgets';

export default function TourSearch() {
  return (
    <>
      <div className="max-w-[375px]">
        <Header className="w-full flex items-center justify-between px-5 mt-1.5 my-6" />
        <SearchContainer />
      </div>
    </>
  );
}
