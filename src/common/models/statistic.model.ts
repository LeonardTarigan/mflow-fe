export type IQuickStats = {
  total: number;
  percentage: number;
};

export type IDailyIncome = {
  total: number;
  date: string;
};

export type IGetDailyIncomeQuery = {
  startDate: string;
  endDate: string;
};
