/* eslint-disable no-unused-vars */
import type { TimestampDto } from '@/api/dto/timestamp.dto'
import type { UserProfile, UserRole }from '@/api/dto/user.dto'

export interface UserCountry {
  status: 'ok' | 'not_found' | 'not_mahali';
  guessedCountry?: string;
}

export interface UserSeller {
  companyName?: string;
  homepage?: string;
  omMerchantCode?: string;
  omOffer?: string[];
  omPhoneNumber?: string;
}

export interface User {
  id: string;
  firstname?: string;
  lastname?: string;
  nickname?: string;
  emailAddress?: string;
  country: string;
  language: string;
  phoneNumber: string;
  picture?: string;
  profile: UserProfile;
  acceptAdvertising: TimestampDto;
  acceptCgu: TimestampDto;
  seller?: UserSeller;
  timezone?: number;
  username: string;
  role: UserRole
}