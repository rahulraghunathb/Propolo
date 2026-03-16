import type { RoomPaymentGroup } from "@/domain/paymentView";
import { getAllRooms } from "@/repositories/roomRepository";
import {
  ensureMonthlyPayments,
  getPaymentsByMonth,
  markTenantPaid
} from "@/repositories/paymentRepository";
import { getActiveTenants } from "@/repositories/tenantRepository";
import { getCurrentPaymentMonth } from "@/utils/date";

export async function loadRoomPayments(): Promise<RoomPaymentGroup[]> {
  const paymentMonth = getCurrentPaymentMonth();
  await ensureMonthlyPayments(paymentMonth);

  const [rooms, tenants, payments] = await Promise.all([
    getAllRooms(),
    getActiveTenants(),
    getPaymentsByMonth(paymentMonth)
  ]);

  const paymentByTenantId = new Map(payments.map((payment) => [payment.tenantId, payment]));

  return rooms.map((room) => ({
    roomId: room.id,
    roomNumber: room.roomNumber,
    sharingType: room.sharingType,
    tenants: tenants
      .filter((tenant) => tenant.roomId === room.id)
      .map((tenant) => {
        const payment = paymentByTenantId.get(tenant.id);

        return {
          tenantId: tenant.id,
          residentName: tenant.residentName,
          mobileNumber: tenant.mobileNumber,
          depositPaid: tenant.depositPaid,
          rentAmount: tenant.rentAmount,
          status: payment?.status ?? "PENDING",
          paidOn: payment?.paidOn ?? null
        };
      })
  }));
}

export async function markTenantAsPaid(tenantId: number, amountPaid: number): Promise<void> {
  await markTenantPaid(tenantId, getCurrentPaymentMonth(), amountPaid);
}

