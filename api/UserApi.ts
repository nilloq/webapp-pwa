import type { UserDto, UserCountryDto } from './dto/user.dto'

class UserApi {
  async getUser(): Promise<UserDto> {
    const { data } = await useApiFetch('/api/v1/user')
    return data.value as UserDto
  }

  // Retrieve public information of a given user (silently fails if not found)
  async getUserPublicInformation(userId: string): Promise<UserDto | undefined> {
    const { data } = await useApiFetch(`/users/${userId}/public`)
    return data.value as UserDto
  }

  async getUserCountry(): Promise<UserCountryDto> {
    const { data } = await useApiFetch('/users/ip2country')
    return data.value as UserCountryDto
  }
}

export default new UserApi()
