import { Header, Seo } from '@/widgets';
import { SearchContainer } from '@/features/tourSearch';

export default function TourSearch() {
  return (
    <>
      <Seo
        title="주변 관광지 검색"
        description="주변 관광지 검색 페이지입니다. 다양한 관광지를 한눈에 확인하고 관리해보세요."
        canonicalUrl="https://p-pick.com/tour/search"
      />
      <div className="max-w-[375px]">
        <Header className="w-full flex items-center justify-between px-5 mt-1.5 my-6" />
        <SearchContainer />
      </div>
    </>
  );
}
