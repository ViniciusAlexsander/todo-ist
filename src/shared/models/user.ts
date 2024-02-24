export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: any;
  image: string;
}

export interface IFindUserResponse {
  id: string;
  name: string;
  email: string;
  image: string;
}
