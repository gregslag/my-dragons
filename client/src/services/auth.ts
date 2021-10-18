import API, { parseResponseError } from './API'

import { IUser, IAuthPayload } from './Interfaces'

export const register = async (
  user: IUser
): Promise<IUser> => {
  try {
    const { data } = await API.post<IUser>('/auth/register', user)

    return data
  } catch (error: any) {
    throw parseResponseError(error)
  }
}

export const login = async ({ email, password }: IAuthPayload): Promise<IUser> => {
  try {
    const { data } = await API.post<IUser>('/auth/login', {
      email,
      password
    })

    return data
  } catch (error: any) {
    throw parseResponseError(error)
  }
}
