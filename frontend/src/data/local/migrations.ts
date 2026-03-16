import { db } from "@/data/local/database";
import {
  createPaymentsTableSql,
  createRoomsTableSql,
  createTenantsTableSql
} from "@/data/local/schema";

export async function runMigrations(): Promise<void> {
  db.execSync(createRoomsTableSql);
  db.execSync(createTenantsTableSql);
  db.execSync(createPaymentsTableSql);
}
