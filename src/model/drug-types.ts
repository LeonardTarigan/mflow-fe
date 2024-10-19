export interface IDrug {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface IDrugFilter {
  name?: string;
  category?: string;
  page?: number;
}
