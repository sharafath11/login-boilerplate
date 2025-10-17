export interface ISignup {
    name: string,
    password: string,
    email: string,
}
export interface TokenPayload {
  id: string;
  role: string;
}