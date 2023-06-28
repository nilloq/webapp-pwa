/* eslint-disable camelcase */
// Copyright (c) 2023 Mahali / Orange

import UserApi from '@/api/UserApi'
// import WhatsappService from './WhatsappService'
// import smsLink from 'sms-link'
import type { UserDto, UserCountryDto } from '@/api/dto/user.dto'
import type { User, UserCountry } from '@/services/model/user.model'

class UserService {

  static #toUser(userDto:UserDto):User{
    return {
      id: userDto.id,
      firstname: userDto.firstname,
      lastname: userDto.lastname,
      nickname: userDto.nickname,
      emailAddress: userDto.email_address,
      country: userDto.country,
      language: userDto.language,
      phoneNumber: userDto.phone_number,
      picture: userDto.picture,
      profile: userDto.profile,
      acceptAdvertising: userDto.accept_advertising,
      acceptCgu: userDto.accept_cgu,
      seller: {
        companyName: userDto.seller?.company_name,
        homepage: userDto.seller?.homepage,
        omMerchantCode: userDto.seller?.om_merchant_code,
        omOffer: userDto.seller?.om_offer,
        omPhoneNumber: userDto.seller?.om_phone_number
      },
      timezone: userDto.timezone,
      username: userDto.username,
      role: userDto.role
    }
  }

  static #toUserDto(user:User):UserDto{
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      nickname: user.nickname,
      email_address: user.emailAddress,
      country: user.country,
      language: user.language,
      phone_number: user.phoneNumber,
      picture: user.picture,
      profile: user.profile,
      accept_advertising: user.acceptAdvertising,
      accept_cgu: user.acceptCgu,
      seller: {
        company_name: user.seller?.companyName,
        homepage: user.seller?.homepage,
        om_merchant_code: user.seller?.omMerchantCode,
        om_offer: user.seller?.omOffer,
        om_phone_number: user.seller?.omPhoneNumber
      },
      timezone: user.timezone,
      username: user.username,
      role: user.role
    }
  }

  static #toUserCountry(userCountryDto:UserCountryDto):UserCountry {
    return {
      status: userCountryDto.status,
      guessedCountry: userCountryDto.guessed_country
    }
  }

  async getUser(): Promise<User> {
    const response = await UserApi.getUser()
    return UserService.#toUser(response)
  }

  // Retrieve public information of a given user (silently fails if not found)
  async getUserPublicInformation(userId: string): Promise<User | undefined> {
    const response = await UserApi.getUserPublicInformation(userId)
    return response ? UserService.#toUser(response): undefined
  }

  // // Update a user
  // async update(user: User): Promise<User> {
  //   const response = await UserApi.update(UserService.#toUserDto(user))
  //   return UserService.#toUser(response)
  // }

  async getUserCountry(): Promise<UserCountry> {
    const response = await UserApi.getUserCountry()
    return UserService.#toUserCountry(response)
  }

  // contact a user using different services (phonecall, sms, whatsapp...)
  contact({ service, recipient, body }: { service: 'phone' | 'message' | 'whatsapp', recipient: string, body: string }) {
    // switch (service) {
    // case 'phone':
    //   window.open(`tel:${recipient}`, '_self')
    //   break
    // case 'message':
    //   window.open(smsLink({ phone: recipient, body }))
    //   break
    // case 'whatsapp':
    //   WhatsappService.dialCall(recipient, body)
    //   break
    // }
    // eslint-disable-next-line no-console
    console.log('contact user')
  }

  // generate a random user nickname
  generateRandomUserNickname(): string {
    return `user_${Math.floor(Math.random() * 100000000)}`
  }
}

export default new UserService()
