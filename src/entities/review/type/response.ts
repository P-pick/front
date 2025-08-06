export type UserType = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};

export type ImageType = {
  imageUrl: string;
  name: string;
};

export interface ReviewResponse {
  id: string;
  contents: string;
  userId: string;
  user: UserType;
  rating: number;
  createdAt: string;
  updatedAt: string;
  images: ImageType[];
}
