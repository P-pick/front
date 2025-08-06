import type { Distance } from '@/features/tourFilter/type';

export const isValidDistance = (value: unknown): value is Distance => {
  return (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 20
  );
};
export default isValidDistance;

const val = 1;

if (isValidDistance(val)) {
  console.log('Valid distance:', val);
}
