import type { IEmployee } from "./employee.model";
import type { IPatient } from "./patient-types";

export const QueueStatus = ["waiting", "on-progress", "done"] as const;

export type TQueueStatus = (typeof QueueStatus)[number];

export interface IVitalSign {
  height: number;
  weight: number;
  temperature: number;
  blood_pressure: number;
  waist_size: number;
  pulse: number;
  respitory_rate: number;
}

export interface IMedicalStatus {
  id: string;
  queue_code: string;
  medical_record_code?: string;
  patient: IPatient;
  doctor: IEmployee;
  room: string;
  registration_date: string;
  has_vital_sign_checked: boolean;
  status: TQueueStatus;
  vital_sign?: IVitalSign;
  diagnosis: string;
  complaint: string;
}
