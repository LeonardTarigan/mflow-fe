import weeklyVisitorsData from "@/repository/dummy/visitors-data.json";

class DashboardService {
  public getWeeklyVisitors() {
    const res = weeklyVisitorsData;

    return res;
  }
}

export const DashboardAPI = new DashboardService();
