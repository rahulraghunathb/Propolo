import { db } from "@/data/local/database";
import { getActiveTenantsSql, getTenantsByRoomSql } from "@/data/local/queries/tenantQueries";
import type { Tenant } from "@/domain/tenant";

type TenantRow = {
  id: number;
  room_id: number;
  resident_name: string;
  mobile_number: string;
  deposit_paid: number;
  rent_amount: number;
  is_active: number;
};

function mapTenant(row: TenantRow): Tenant {
  return {
    id: row.id,
    roomId: row.room_id,
    residentName: row.resident_name,
    mobileNumber: row.mobile_number,
    depositPaid: row.deposit_paid,
    rentAmount: row.rent_amount,
    isActive: row.is_active === 1
  };
}

export async function getActiveTenants(): Promise<Tenant[]> {
  const rows = db.getAllSync<TenantRow>(getActiveTenantsSql);
  return rows.map(mapTenant);
}

export async function getTenantsByRoom(roomId: number): Promise<Tenant[]> {
  const rows = db.getAllSync<TenantRow>(getTenantsByRoomSql, [roomId]);
  return rows.map(mapTenant);
}
