export interface ReviewResponse {
  id: string;
  contents: string;
  userId: string;
  user: {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
  };
  rating: number;
  createdAt: string;
  updatedAt: string;
  images?: string[];
}
