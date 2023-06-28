export interface Post {
  id?: string;
  sellerCompanyName?: string;
  sellerAvatarUrl?: string;
  sellerId?: string;
  sellerAlias?: string,
  sellerPostCount?: number,
  images?: string[];
  description: string;
  productName?: string;
  productPriceOriginal?: number;
  productPriceDiscount?: number;
  currency?: string;
  country?: string;
  endDate?: Date,
  weight: number,
  status: 'active' | 'deleted'
}

export interface PostPatch {
  id?: string;
  images?: string[];
  description: string;
  productName?: string;
  productPriceOriginal?: number;
  productPriceDiscount?: number;
}


export interface GetPostsResponse {
  total: number
  posts: Post[]
}