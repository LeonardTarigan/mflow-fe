import { IVitalSign } from "./care-history.model";
import { IAddPatientPayload } from "./patient.model";

export type TQueueStatus =
  | "WAITING_CONSULTATION"
  | "IN_CONSULTATION"
  | "WAITING_MEDICATION"
  | "WAITING_PAYMENT"
  | "COMPLETED";

export interface IQueue {
  id: number;
  status: TQueueStatus;
  complaints: string;
  patient_id: string;
  doctor_id: string;
  room_id: string;
  queue_number: string;
  created_at: Date;
  updated_at: Date;
}

export interface IAddQueuePayload {
  room_id: number;
  doctor_id: string;
  complaints: string;
  patient_id?: string;
  patient_data?: IAddPatientPayload;
}

export interface IAddSessionVitalSignPayload extends IVitalSign {
  care_session_id: number;
}

export interface IUpdateQueuePayload {
  status: TQueueStatus;
}

export interface IVitalSignDetail extends IVitalSign {
  id: number;
  created_at: Date;
  updated_at: Date;
}
