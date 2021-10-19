import API, { parseResponseError } from './API'

import { IDragon } from './Interfaces'

export const getDragons = async (): Promise<IDragon[]> => {
  try {
    const { data } = await API.get<IDragon[]>('/dragon')

    return data
  } catch (error: any) {
    throw parseResponseError(error)
  }
}

export const getDragonById = async (dragonId: string): Promise<IDragon> => {
  try {
    const { data } = await API.get<IDragon>(`/dragon/${dragonId}`)

    return data
  } catch (error: any) {
    throw parseResponseError(error)
  }
}

export const createDragon = async (dragon: IDragon): Promise<IDragon> => {
  try {
    const { data } = await API.post<IDragon>('/dragon', dragon)

    return data
  } catch (error: any) {
    throw parseResponseError(error)
  }
}

export const updateDragon = async (dragon: IDragon): Promise<IDragon> => {
  try {
    const { data } = await API.put<IDragon>(`/dragon/${dragon.id}`, dragon)

    return data
  } catch (error: any) {
    throw parseResponseError(error)
  }
}

export const deleteDragon = async (dragonId: string): Promise<IDragon> => {
  try {
    const { data } = await API.delete<IDragon>(`/dragon/${dragonId}`)

    return data
  } catch (error: any) {
    throw parseResponseError(error)
  }
}
