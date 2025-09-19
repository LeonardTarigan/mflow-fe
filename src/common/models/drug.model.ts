export interface IDrug {
  id: number;
  name: string;
  stock: number;
  unit: string;
  price: number;
}

export interface IAddDrugPayload {
  name: string;
  unit: string;
  price: number;
}

export interface IUpdateDrugPayload {
  name?: string;
  unit?: string;
  price?: number;
  amount_sold?: number;
}

export type IDrugOrder = {
  id: number;
  applied_price: number;
  quantity: number;
  dose: string;
  drug: Pick<IDrug, "id" | "name" | "unit">;
};

export interface ISessionDrugOrderDetail {
  id: number;
  name: string;
  quantity: number;
  price: number;
  dose: string;
  unit: string;
}

export interface IAddSessionDrugOrderPayload {
  care_session_id: number;
  drug_id: number;
  quantity: number;
  dose: string;
}
