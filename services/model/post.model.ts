export interface Post {
  id: string;
  sellerCompanyName: string;
  sellerAvatarUrl: string;
  images?: string[];
  description: string;
  price?: number;
  priceOriginal?: number;
  currency?: string;
}

export interface GetPostsResponse {
  total: number
  posts: Post[]
}