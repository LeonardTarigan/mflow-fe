import type { IEmployee } from "./employee.model";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: IEmployee;
  token: string;
}
