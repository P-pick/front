export interface GetBookmarkRequest {
  userId: string;
  contentId: string;
}

export interface ToggleBookmarkRequest extends GetBookmarkRequest {
  bookmarked: boolean;
}

export interface getBookmarkListRequest {
  userId: string;
  pageParam?: number | null | undefined;
}
