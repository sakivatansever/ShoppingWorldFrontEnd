export interface IUser {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  department: string;
  phoneNumber: string | null;
  exp: number;
  iss: string;
  aud: string;
  role: string;
  email: string;
}
