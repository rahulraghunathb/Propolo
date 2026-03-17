import * as SQLite from "expo-sqlite";

const databaseName = "propolo.db";

export const db = SQLite.openDatabaseSync(databaseName);
