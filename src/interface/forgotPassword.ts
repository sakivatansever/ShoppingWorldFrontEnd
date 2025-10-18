export interface IForgotPassword {
  email: string;
}

export interface IForgotPasswordResponse {
  message: string;
  token?: string;
  resetUrl?: string;
}
