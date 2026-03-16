import * as SQLite from "expo-sqlite";

const databaseName = "pg-rent-mvp.db";

export const db = SQLite.openDatabaseSync(databaseName);
