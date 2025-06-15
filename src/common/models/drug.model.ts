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
}
