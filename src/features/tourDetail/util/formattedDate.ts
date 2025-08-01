export const formattedDate = (dateStr: string | undefined): string => {
  const str = String(dateStr);
  if (str.length !== 8) return '날짜 형식 오류';

  const year = str.slice(0, 4);
  const month = str.slice(4, 6);
  const day = str.slice(6, 8);

  return `${year}-${month}-${day}`;
};
