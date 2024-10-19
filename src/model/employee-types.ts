export enum EmployeeRole {
  admin = "admin",
  staff = "staff",
  doctor = "doctor",
}

export interface IEmployee {
  id: string;
  nip: string;
  name: string;
  email: string;
  phone: string;
  role: EmployeeRole;
}
