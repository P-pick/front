import type { SORT_OPTIONS, DISTANCE } from '@/features/tourFilter';

export type SortOption = (typeof SORT_OPTIONS)[number]['value'];

export type Distance = (typeof DISTANCE)[number];
