import { IVitalSign } from "./care-history.model";
import { IAddPatientPayload, TGender } from "./patient.model";

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

export interface IPharmacyQueueDetail {
  id: number;
  queue_number: string;
  complaints: string;
  doctor: { id: string; username: string };
  patient: { id: string; name: string; birth_date: Date; gender: TGender };
  diagnoses: { id: number; name: string }[];
  drug_orders: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    dose: string;
  }[];
}

export interface IPharmacyQueue {
  current: IPharmacyQueueDetail;
  next_queues: { id: number; queue_number: string }[];
}

export interface IDoctorQueueDetail {
  id: number;
  queue_number: string;
  complaints: string;
  doctor: { id: string; username: string };
  patient: {
    id: string;
    name: string;
    birth_date: Date;
    gender: TGender;
    occupation: string;
  };
}

export interface IDoctorQueue {
  current: IDoctorQueueDetail;
  next_queues: { id: number; queue_number: string }[];
}

export interface IWaitingQueue {
  id: number;
  queue_number: string;
  doctor: {
    id: string;
    username: string;
  };
  room: { id: number; name: string };
}

export interface ICalledQueue {
  id: number;
  queue_number: string;
}
