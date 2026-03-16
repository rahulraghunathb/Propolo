import { getDashboardSummary } from "@/repositories/paymentRepository";
import { getCurrentPaymentMonth } from "@/utils/date";

export async function loadDashboardSummary() {
  return getDashboardSummary(getCurrentPaymentMonth());
}

