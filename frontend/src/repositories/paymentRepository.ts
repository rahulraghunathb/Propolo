import { db } from "@/data/local/database";
import { getPaymentsByMonthSql, markTenantPaidSql } from "@/data/local/queries/paymentQueries";
import type { DashboardSummary } from "@/domain/dashboard";
import type { Payment } from "@/domain/payment";
import { getCurrentDateIso } from "@/utils/date";

type PaymentRow = {
  id: number;
  tenant_id: number;
  payment_month: string;
  status: Payment["status"];
  paid_on: string | null;
  amount_paid: number | null;
};

function mapPayment(row: PaymentRow): Payment {
  return {
    id: row.id,
    tenantId: row.tenant_id,
    paymentMonth: row.payment_month,
    status: row.status,
    paidOn: row.paid_on,
    amountPaid: row.amount_paid
  };
}

export async function ensureMonthlyPayments(paymentMonth: string): Promise<void> {
  const activeTenants = db.getAllSync<{ id: number }>("SELECT id FROM tenants WHERE is_active = 1");

  for (const tenant of activeTenants) {
    db.runSync(
      `INSERT OR IGNORE INTO payments (tenant_id, payment_month, status, paid_on, amount_paid)
       VALUES (?, ?, 'PENDING', NULL, NULL)`,
      [tenant.id, paymentMonth]
    );
  }
}

export async function getPaymentsByMonth(paymentMonth: string): Promise<Payment[]> {
  const rows = db.getAllSync<PaymentRow>(getPaymentsByMonthSql, [paymentMonth]);
  return rows.map(mapPayment);
}

export async function markTenantPaid(tenantId: number, paymentMonth: string, amountPaid: number): Promise<void> {
  db.runSync(markTenantPaidSql, [getCurrentDateIso(), amountPaid, tenantId, paymentMonth]);
}

export async function getDashboardSummary(paymentMonth: string): Promise<DashboardSummary> {
  const totals = db.getFirstSync<{
    totalRooms: number;
    totalTenants: number;
    paidTenants: number;
    pendingTenants: number;
    totalExpectedRent: number;
    totalCollectedRent: number;
  }>(
    `
    SELECT
      (SELECT COUNT(*) FROM rooms) AS totalRooms,
      COUNT(t.id) AS totalTenants,
      SUM(CASE WHEN p.status = 'PAID' THEN 1 ELSE 0 END) AS paidTenants,
      SUM(CASE WHEN p.status = 'PENDING' THEN 1 ELSE 0 END) AS pendingTenants,
      SUM(t.rent_amount) AS totalExpectedRent,
      SUM(CASE WHEN p.status = 'PAID' THEN COALESCE(p.amount_paid, t.rent_amount) ELSE 0 END) AS totalCollectedRent
    FROM tenants t
    LEFT JOIN payments p
      ON p.tenant_id = t.id
      AND p.payment_month = ?
    WHERE t.is_active = 1;
    `,
    [paymentMonth]
  );

  return {
    totalRooms: totals?.totalRooms ?? 0,
    totalTenants: totals?.totalTenants ?? 0,
    paidTenants: totals?.paidTenants ?? 0,
    pendingTenants: totals?.pendingTenants ?? 0,
    totalExpectedRent: totals?.totalExpectedRent ?? 0,
    totalCollectedRent: totals?.totalCollectedRent ?? 0
  };
}
