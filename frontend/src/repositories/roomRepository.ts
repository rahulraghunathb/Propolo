import { db } from "@/data/local/database";
import { getAllRoomsSql } from "@/data/local/queries/roomQueries";
import type { Room } from "@/domain/room";

function mapRoom(row: { id: number; room_number: string; sharing_type: Room["sharingType"] }): Room {
  return {
    id: row.id,
    roomNumber: row.room_number,
    sharingType: row.sharing_type
  };
}

export async function getAllRooms(): Promise<Room[]> {
  const rows = db.getAllSync<{ id: number; room_number: string; sharing_type: Room["sharingType"] }>(getAllRoomsSql);
  return rows.map(mapRoom);
}
