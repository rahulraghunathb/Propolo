import { getAllRooms, getRoomById } from "../repositories/roomRepository.js";
import { getTenantsByRoomId } from "../repositories/tenantRepository.js";
import { createHttpError } from "../utils/httpError.js";

export function listRooms() {
  return getAllRooms().map((room) => ({
    ...room,
    tenantCount: getTenantsByRoomId(room.id).length
  }));
}

export function getRoomTenants(roomId) {
  const room = getRoomById(roomId);

  if (!room) {
    throw createHttpError(404, "Room not found.");
  }

  return {
    room,
    tenants: getTenantsByRoomId(roomId)
  };
}
