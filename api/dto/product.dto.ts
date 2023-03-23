export interface ProductDto {
  id: number;
  title: string;
  price: number;
  discountPercentage: number,
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface GetProductApiResponse {
  products: ProductDto[]
}