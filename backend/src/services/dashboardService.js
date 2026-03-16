import { getAllRooms } from "../repositories/roomRepository.js";
import { getPaymentsByMonth } from "../repositories/paymentRepository.js";
import { getActiveTenants } from "../repositories/tenantRepository.js";
import { getCurrentPaymentMonth } from "../utils/paymentMonth.js";

export function getDashboardSummary(paymentMonth = getCurrentPaymentMonth()) {
  const rooms = getAllRooms();
  const tenants = getActiveTenants();
  const payments = getPaymentsByMonth(paymentMonth);
  const paymentByTenantId = new Map(payments.map((payment) => [payment.tenantId, payment]));

  const paidTenants = tenants.filter(
    (tenant) => paymentByTenantId.get(tenant.id)?.status === "PAID"
  );

  return {
    totalRooms: rooms.length,
    totalTenants: tenants.length,
    paidTenants: paidTenants.length,
    pendingTenants: tenants.length - paidTenants.length,
    totalExpectedRent: tenants.reduce((sum, tenant) => sum + tenant.rentAmount, 0),
    totalCollectedRent: paidTenants.reduce(
      (sum, tenant) => sum + (paymentByTenantId.get(tenant.id)?.amountPaid ?? tenant.rentAmount),
      0
    )
  };
}
