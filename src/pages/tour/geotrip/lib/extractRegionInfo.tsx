type RegionInfo = {
  sido: string;
  sigungu: string;
} | null;

const extractRegionInfo = (addr: string | undefined | null): RegionInfo => {
  if (!addr) return null;

  const match = addr.match(
    /([가-힣]+(?:특별시|광역시|특별자치시|도|특별자치도))\s([가-힣]+(?:시|군|구))/,
  );

  if (!match) return null;

  const [, sido, sigungu] = match;
  return { sido, sigungu };
};

export default extractRegionInfo;
