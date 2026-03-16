import type { RoomPaymentGroup } from "@/domain/paymentView";

export type PaymentFilter = "ALL" | "PAID" | "PENDING";

export function filterRoomPayments(
  rooms: RoomPaymentGroup[],
  query: string,
  statusFilter: PaymentFilter
): RoomPaymentGroup[] {
  const normalizedQuery = query.trim().toLowerCase();

  return rooms
    .map((room) => {
      const filteredTenants = room.tenants.filter((tenant) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          room.roomNumber.toLowerCase().includes(normalizedQuery) ||
          tenant.residentName.toLowerCase().includes(normalizedQuery) ||
          tenant.mobileNumber.includes(normalizedQuery);

        const matchesStatus =
          statusFilter === "ALL" || tenant.status === statusFilter;

        return matchesQuery && matchesStatus;
      });

      return {
        ...room,
        tenants: filteredTenants
      };
    })
    .filter((room) => room.tenants.length > 0);
}
