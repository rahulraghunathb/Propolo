import { useEffect, useState } from "react";
import type { RoomPaymentGroup } from "@/domain/paymentView";
import { loadRoomPayments, markTenantAsPaid } from "@/services/paymentService";

export function usePayments() {
  const [rooms, setRooms] = useState<RoomPaymentGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      setIsLoading(true);
      const nextRooms = await loadRoomPayments();
      setRooms(nextRooms);
      setError(null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load payments.");
    } finally {
      setIsLoading(false);
    }
  }

  async function markPaid(tenantId: number, amountPaid: number) {
    try {
      setIsMutating(true);
      await markTenantAsPaid(tenantId, amountPaid);
      await refresh();
    } catch (mutationError) {
      setError(mutationError instanceof Error ? mutationError.message : "Unable to update payment.");
    } finally {
      setIsMutating(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  return { rooms, isLoading, isMutating, error, refresh, markPaid };
}
