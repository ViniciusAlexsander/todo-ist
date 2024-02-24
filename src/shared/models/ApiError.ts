export interface ApiError {
  response: IResponse;
}

export interface IResponse {
  status: number;
  statusText: string;
  data: IData;
}

export interface IData {
  message: string;
}
