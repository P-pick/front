export interface GetBookmarkRequest {
  userId: string;
  contentId: string;
}

export interface ToggleBookmarkRequest extends GetBookmarkRequest {
  bookmarked: boolean;
}
