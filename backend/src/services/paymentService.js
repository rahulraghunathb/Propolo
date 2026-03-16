import { getAllRooms } from "../repositories/roomRepository.js";
import { getPaymentsByMonth, markTenantPaid } from "../repositories/paymentRepository.js";
import { getActiveTenants, getTenantById } from "../repositories/tenantRepository.js";
import { createHttpError } from "../utils/httpError.js";
import { getCurrentPaymentMonth } from "../utils/paymentMonth.js";

export function listPayments(paymentMonth = getCurrentPaymentMonth()) {
  const tenants = getActiveTenants();
  const rooms = getAllRooms();
  const payments = getPaymentsByMonth(paymentMonth);
  const paymentByTenantId = new Map(payments.map((payment) => [payment.tenantId, payment]));

  return rooms.map((room) => ({
    roomId: room.id,
    roomNumber: room.roomNumber,
    sharingType: room.sharingType,
    tenants: tenants
      .filter((tenant) => tenant.roomId === room.id)
      .map((tenant) => ({
        tenantId: tenant.id,
        residentName: tenant.residentName,
        mobileNumber: tenant.mobileNumber,
        depositPaid: tenant.depositPaid,
        rentAmount: tenant.rentAmount,
        status: paymentByTenantId.get(tenant.id)?.status ?? "PENDING",
        paidOn: paymentByTenantId.get(tenant.id)?.paidOn ?? null
      }))
  }));
}

export function updatePaymentStatus(tenantId, paymentMonth = getCurrentPaymentMonth()) {
  const tenant = getTenantById(tenantId);

  if (!tenant) {
    throw createHttpError(404, "Tenant not found.");
  }

  return markTenantPaid(tenantId, paymentMonth);
}
