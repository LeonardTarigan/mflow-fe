export const EMPLOYEE_ROLES = ["ADMIN", "DOKTER", "FARMASI", "STAFF"] as const;

export type TEmployeeRole = (typeof EMPLOYEE_ROLES)[number];

export interface IEmployee {
  id: string;
  nip: string;
  username: string;
  email: string;
  phone: string;
  role: TEmployeeRole;
}

export interface IAddEmployeePayload {
  username: string;
  email: string;
  role: TEmployeeRole;
}

export interface IAddEmployeeResponse {
  user: IEmployee;
  token: string;
}

export interface IUpdateEmployeePayload {
  username?: string;
  role?: TEmployeeRole;
}
