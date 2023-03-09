/* eslint-disable no-unused-vars */
import type { TimestampDto } from './timestamp.dto'

export enum UserProfile {
  SELLER = 'seller',
  DELIVERY_MAN = 'delivery_man',
  CUSTOMER = 'customer'
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface UserCountryDto {
  status: 'ok' | 'not_found' | 'not_mahali';
  guessed_country?: string;
}

export interface UserSellerDto {
  company_name?: string;
  homepage?: string;
  om_merchant_code?: string;
  om_offer?: string[];
  om_phone_number?: string;
}

export interface UserAlias {
  alias: string;
  id: string;
  user_id?: string;
}

export interface UserDto {
  id: string;
  firstname?: string;
  lastname?: string;
  nickname?: string;
  email_address?: string;
  country: string;
  language: string;
  phone_number: string;
  picture?: string;
  profile: UserProfile;
  accept_advertising: TimestampDto;
  accept_cgu: TimestampDto;
  seller?: UserSellerDto;
  timezone?: number;
  username: string;
  role: UserRole
}