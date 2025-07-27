export const highlightKeyword = (text: string, keyword: string) => {
  if (!keyword.trim()) return text;

  const index = text.toLowerCase().indexOf(keyword.toLowerCase());
  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + keyword.length);
  const after = text.slice(index + keyword.length);

  return (
    <>
      {before}
      <span className="text-primary font-semibold">{match}</span>
      {after}
    </>
  );
};
