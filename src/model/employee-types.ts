export const EmployeeRoles = ["admin", "staff", "doctor"] as const;

export type TEmployeeRole = (typeof EmployeeRoles)[number];

export interface IEmployee {
  id: string;
  nip: string;
  name: string;
  email: string;
  phone: string;
  role: TEmployeeRole;
}
