export interface IDrug {
  id: number;
  name: string;
  amount_sold: number;
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

export interface IDrugOrder {
  id: number;
  name: string;
  quantity: number;
  dose: string;
  unit?: string;
}

export interface IAddSessionDrugOrderPayload {
  care_session_id: number;
  drugs: { drug_id: number; quantity: number; dose: string }[];
}
