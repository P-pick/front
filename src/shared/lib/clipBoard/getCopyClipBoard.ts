const getCopyClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('복사에 성공했습니다!');
  } catch {
    alert('복사에 실패했습니다. 다시 시도해 주세요.');
  }
};

export default getCopyClipBoard;
