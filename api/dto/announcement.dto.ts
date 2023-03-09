import type { TimestampDto } from './timestamp.dto'
import type { UserAlias } from './user.dto'

export interface AnnouncementSellerDto {
  picture: string;
  seller : {
    company_name: string;
  }
}

export interface AnnouncementDto {
  country: string;
  creation_date?: TimestampDto;
  end_date:TimestampDto;
  currency?: string;
  id?: string;
  images: string[];
  number_announcement: number;
  price?: number;
  price_discount?: number;
  price_original?: number;
  product_id?: string;
  text: string;
  user?: AnnouncementSellerDto;
  user_alias?: UserAlias[];
  user_id?: string;
}

export interface GetAnnoucementApiResponse {
  total: number,
  announcements: AnnouncementDto[]
}
