import { rooms } from "../data/mockData.js";

export function getAllRooms() {
  return rooms;
}

export function getRoomById(roomId) {
  return rooms.find((room) => room.id === roomId) || null;
}
