export interface IResetPassword {
  email: string;
  token: string;
  newPassword: string;
}

export interface IResetPasswordResponse {
  message: string;
}
