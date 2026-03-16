export const createRoomsTableSql = `
CREATE TABLE IF NOT EXISTS rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_number TEXT NOT NULL UNIQUE,
  sharing_type TEXT NOT NULL
);
`;

export const createTenantsTableSql = `
CREATE TABLE IF NOT EXISTS tenants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id INTEGER NOT NULL,
  resident_name TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  deposit_paid REAL NOT NULL,
  rent_amount REAL NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);
`;

export const createPaymentsTableSql = `
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id INTEGER NOT NULL,
  payment_month TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('PENDING', 'PAID')),
  paid_on TEXT,
  amount_paid REAL,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id),
  UNIQUE (tenant_id, payment_month)
);
`;
