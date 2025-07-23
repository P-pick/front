export type YPosition = '0%' | '50%' | '80%';

export const getNextYPosition = (
  currentY: YPosition,
  offsetY: number,
): YPosition => {
  if (currentY === '80%') {
    if (offsetY < -50) return '0%';
    if (offsetY < -10) return '50%';
    return '80%';
  }
  if (currentY === '50%') {
    if (offsetY < -10) return '0%';
    if (offsetY > 10) return '80%';
    return '50%';
  }
  if (currentY === '0%') {
    if (offsetY > 50) return '80%';
    if (offsetY > 10) return '50%';
    return '0%';
  }
  return currentY;
};

export const shouldClose = (currentY: YPosition, offsetY: number): boolean => {
  return currentY === '80%' && offsetY > 10;
};
