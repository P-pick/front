import { PEDESTRIAN, CAR } from '@/entities/navigate';
import type { GeoTripLocation } from '@/shared';

export type TurnType =
  | 11 //직진
  | 12 //좌회전
  | 13 //우회전
  | 14 //유턴
  | 16 //8시 방향 좌회전
  | 17 //10시 방향 좌회전
  | 18 //2시 방향 우회전
  | 19 //4시 방향 우회전
  | 119 //지하차도
  | 184 //경유지
  | 185 //첫 번째 경유지
  | 186 //두 번째 경유지
  | 187 //세 번째 경유지
  | 188 //네 번째 경유지
  | 189 //다섯 번째 경유지
  | 121 //터널진입
  | 124 //고가도로 옆갈
  | 125 //육교
  | 126 //지하보도
  | 127 //계단 진입
  | 128 // 경사로 진입
  | 129 //계단 + 경사로 진입
  | 200 // 출발지
  | 201 // 목적지
  | 211 //횡단보도
  | 212 //좌측 횡산보도
  | 213 //우측 횡단보도
  | 214 // 8시 방향 횡단보도
  | 215 // 10시 방향 횡단보도
  | 216 // 2시 방향 횡단보도
  | 217 // 4시 방향 횡단보도
  | 218; // 엘리베이터

export type TransportationType =
  | 'pedestrian'
  | 'car'
  | 'bicycle'
  | 'publictransit';

export interface FollowBase {
  id: string;
  path: GeoTripLocation[];
  description: string;
  distance?: number;
  index: number;
}

export type SearchOptions = PEDESTRIAN.SearchOptions | CAR.SearchOptions;
