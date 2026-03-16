import { tenants } from "../data/mockData.js";

export function getActiveTenants() {
  return tenants.filter((tenant) => tenant.isActive);
}

export function getTenantsByRoomId(roomId) {
  return tenants.filter((tenant) => tenant.roomId === roomId && tenant.isActive);
}

export function getTenantById(tenantId) {
  return tenants.find((tenant) => tenant.id === tenantId && tenant.isActive) || null;
}
