export interface IAuthPayload {
  email: string;
  password: string;
}

export interface IUser extends IAuthPayload {
  name: string;
  accessToken?: string;
}

export interface IDragon {
  id?: string
  name: string
  type: string
  avatar: string
  histories?: any[]
  createdAt?: string
}
