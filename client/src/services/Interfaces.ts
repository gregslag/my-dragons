export interface IAuthPayload {
  email: string;
  password: string;
}

export interface IUser extends IAuthPayload {
  name: string;
  accessToken?: string;
}
