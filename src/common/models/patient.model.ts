export type TGender = "MALE" | "FEMALE";

export interface IPatient {
  id: number;
  name: string;
  medical_record_number?: string;
  nik: string;
  birth_date: Date;
  address: string;
  gender: TGender;
  occupation: string;
  phone_number: string;
  email?: string;
}

export type IAddPatientPayload = Omit<IPatient, "id" | "medical_record_number">;
