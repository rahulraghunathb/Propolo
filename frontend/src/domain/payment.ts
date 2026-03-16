export type PaymentStatus = "PENDING" | "PAID";

export type Payment = {
  id: number;
  tenantId: number;
  paymentMonth: string;
  status: PaymentStatus;
  paidOn?: string | null;
  amountPaid?: number | null;
};

