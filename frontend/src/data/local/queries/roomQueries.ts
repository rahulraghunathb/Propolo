export const getAllRoomsSql = `
SELECT id, room_number, sharing_type
FROM rooms
ORDER BY room_number ASC;
`;
