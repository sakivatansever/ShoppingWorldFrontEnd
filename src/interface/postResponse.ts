export interface IPostResponse<T> {
    refreshToken: any;
    accessToken: any;
    data: T;
    message: string;
    statusCode: number;
  }