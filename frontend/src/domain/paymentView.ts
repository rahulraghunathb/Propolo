import type { PaymentStatus } from "@/domain/payment";

export type TenantPaymentItem = {
  tenantId: number;
  residentName: string;
  mobileNumber: string;
  depositPaid: number;
  rentAmount: number;
  status: PaymentStatus;
  paidOn?: string | null;
};

export type RoomPaymentGroup = {
  roomId: number;
  roomNumber: string;
  sharingType: string;
  tenants: TenantPaymentItem[];
};

