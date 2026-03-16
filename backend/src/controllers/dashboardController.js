import { getDashboardSummary } from "../services/dashboardService.js";

export function getDashboard(request, response, next) {
  try {
    response.json({
      data: getDashboardSummary(request.query.month)
    });
  } catch (error) {
    next(error);
  }
}
