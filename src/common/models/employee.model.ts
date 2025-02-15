export const EMPLOYEE_ROLES = [
  "ADMIN",
  "DOKTER",
  "PERAWAT",
  "BIDAN",
  "FARMASI",
  "APOTEKER",
  "STAFF",
] as const;

export type TEmployeeRole = (typeof EMPLOYEE_ROLES)[number];

export interface IEmployee {
  id: string;
  nip: string;
  name: string;
  email: string;
  phone: string;
  role: TEmployeeRole;
}

export interface IAddEmployeePayload {
  name: string;
  email: string;
  phone: string;
  role: TEmployeeRole;
}

export interface IAddEmployeeResponse {
  user: IEmployee;
  token: string;
}

export interface IUpdateEmployeePayload {
  name?: string;
  phone?: string;
  role?: TEmployeeRole;
}
