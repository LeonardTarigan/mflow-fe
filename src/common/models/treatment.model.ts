export interface ICareSessionTreatment {
  id: number;
  name: string;
  price: number;
  quantity: number;
  applied_price?: number;
}

export interface IAddCareSessionTreatmentPayload {
  care_session_id: number;
  treatments: { treatment_id: number; quantity: number }[];
}

export type TTreatment = {
  id: number;
  name: string;
  price: number;
};

export type TAddTreatmentPayload = {
  name: string;
  price: number;
};

export type TUpdateTreatmentPayload = Partial<TAddTreatmentPayload>;
