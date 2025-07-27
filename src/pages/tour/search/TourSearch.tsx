import { Header } from '@/widgets';
import { SearchContainer } from '@/features/tourSearch';

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
