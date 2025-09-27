export interface Bookmark {
  spotId: string;
  bookmarked: boolean;
  timestamp: number;
}

export interface getBookmarkListResponse {
  bookmarks: Bookmark[];
  nextCursor: number | null;
}
