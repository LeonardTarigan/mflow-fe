import type { IEmployee } from "./employee-types";
import type { IPatient } from "./patient-types";

export interface IHistory {
  id: string;
  timestamp: string;
  admin: Omit<IEmployee, "role">;
  doctor: Omit<IEmployee, "role">;
  patient: Pick<IPatient, "id" | "name" | "nik">;
  room: string;
  total_price: number;
}
