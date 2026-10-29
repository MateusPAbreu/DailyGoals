import * as SQLite from 'expo-sqlite';

const db_path = 'config.db';

let db = null;

async function databaseInitialization(){
    if (!db){
        db = await SQLite.openDatabaseAsync(db_path);
    }
    return db;
}

initDatabase();

export async function initDatabase() {
    db = await databaseInitialization();

    if (!db) {
        //await cannot be called outside of an async function
        // db = await SQLite.openDatabaseAsync('goals.db');
        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS config (
        id INTEGER PRIMARY KEY NOT NULL,
        firstNot INTEGER,
        midNot INTEGER,
        lastNot INTEGER
        );
    `);
    }
}

export async function allRows(){
    const goals = await db.getAllAsync('SELECT * FROM config');
    console.log("Current goals: ", JSON.stringify(goals, null, 2));
};

