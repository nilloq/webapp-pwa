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
  images?: string[];
  title?: string;
  price_discount?: number;
  price?: number;
  product_id?: string;
  text: string;
  user_id?: string;
  weight: number,
  status: 'active' | 'deleted'
}

export interface AnnouncementPatchDto {
  id?: string;
  images?: string[];
  title?: string;
  price_discount?: number;
  price?: number;
  text: string;
}

export interface AnnouncementViewDto {
  announcement: AnnouncementDto;
  number_announcement?: number;
  user?: AnnouncementSellerDto;
  user_alias?: UserAlias[];
}

export interface GetAnnoucementApiResponse {
  total: number,
  announcements: AnnouncementViewDto[]
}
