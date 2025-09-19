export type ITreatment = {
  id: number;
  name: string;
  price: number;
};

export type ICareSessionTreatment = {
  treatment: Pick<ITreatment, "id" | "name">;
  quantity: number;
  applied_price: number;
};

export interface IAddCareSessionTreatmentPayload {
  care_session_id: number;
  treatment_id: number;
  quantity: number;
}

export type IDeleteCareSessionTreatmentPayload = {
  care_session_id: number;
  treatment_id: number;
};

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
