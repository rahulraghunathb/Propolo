export const getActiveTenantsSql = `
SELECT id, room_id, resident_name, mobile_number, deposit_paid, rent_amount, is_active
FROM tenants
WHERE is_active = 1
ORDER BY room_id ASC, resident_name ASC;
`;

export const getTenantsByRoomSql = `
SELECT id, room_id, resident_name, mobile_number, deposit_paid, rent_amount, is_active
FROM tenants
WHERE room_id = ? AND is_active = 1
ORDER BY resident_name ASC;
`;
