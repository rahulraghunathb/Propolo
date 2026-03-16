import { payments } from "../data/mockData.js";
import { getActiveTenants, getTenantById } from "./tenantRepository.js";

function paymentKey(tenantId, paymentMonth) {
  return `${tenantId}:${paymentMonth}`;
}

export function ensureMonthlyPayments(paymentMonth) {
  for (const tenant of getActiveTenants()) {
    const key = paymentKey(tenant.id, paymentMonth);

    if (!payments.has(key)) {
      payments.set(key, {
        tenantId: tenant.id,
        paymentMonth,
        status: "PENDING",
        paidOn: null,
        amountPaid: null
      });
    }
  }
}

export function getPaymentsByMonth(paymentMonth) {
  ensureMonthlyPayments(paymentMonth);

  return Array.from(payments.values()).filter((payment) => payment.paymentMonth === paymentMonth);
}

export function markTenantPaid(tenantId, paymentMonth) {
  const tenant = getTenantById(tenantId);

  if (!tenant) {
    return null;
  }

  const nextPayment = {
    tenantId,
    paymentMonth,
    status: "PAID",
    paidOn: new Date().toISOString().slice(0, 10),
    amountPaid: tenant.rentAmount
  };

  payments.set(paymentKey(tenantId, paymentMonth), nextPayment);
  return nextPayment;
}
