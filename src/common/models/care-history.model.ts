import { TQueueStatus } from "./queue.model";

export interface IVitalSign {
  height_cm: number;
  weight_kg: number;
  body_temperature_c: number;
  blood_pressure: string;
  heart_rate_bpm: number;
  respiratory_rate_bpm: number;
}

export interface ICareHistory {
  id: number;
  queue_number: string;
  status: TQueueStatus;
  complaints: string;
  diagnoses: { id: string; name: string }[];
  doctor: {
    id: string;
    username: string;
  };
  patient: {
    id: string;
    name: string;
    medical_record_number: string;
  };
  room: {
    id: string;
    name: string;
  };
  vital_sign?: IVitalSign;
  drug_orders: { id: string; name: string; quantity: number; price: number }[];
  created_at: Date;
  updated_at: Date;
}
