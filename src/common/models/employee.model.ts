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
