export const EmployeeRoles = [
  "ADMIN",
  "DOKTER",
  "PERAWAT",
  "BIDAN",
  "FARMASI",
  "APOTEKER",
  "STAFF",
] as const;

export type TEmployeeRole = (typeof EmployeeRoles)[number];

export interface IEmployee {
  id: string;
  nip: string;
  name: string;
  email: string;
  phone: string;
  role: TEmployeeRole;
}
