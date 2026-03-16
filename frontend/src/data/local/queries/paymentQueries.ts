export const getPaymentsByMonthSql = `
SELECT id, tenant_id, payment_month, status, paid_on, amount_paid
FROM payments
WHERE payment_month = ?
ORDER BY tenant_id ASC;
`;

export const markTenantPaidSql = `
UPDATE payments
SET status = 'PAID', paid_on = ?, amount_paid = ?
WHERE tenant_id = ? AND payment_month = ?;
`;
