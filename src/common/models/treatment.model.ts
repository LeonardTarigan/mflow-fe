export interface ICareSessionTreatment {
  id: number;
  name: string;
  price: number;
  quantity: number;
  applied_price: number;
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
