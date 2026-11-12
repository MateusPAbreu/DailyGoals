import * as SQLite from 'expo-sqlite';

const db_path = 'config.db';

let db = null;

async function databaseInitialization() {
    if (!db) {
        db = await SQLite.openDatabaseAsync(db_path);
    }
    return db;
}

initDatabase();

export async function initDatabase() {
    db = await databaseInitialization();

    console.log(!db)

    // if (!db) { 
        //await cannot be called outside of an async function
        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS config (
        id INTEGER PRIMARY KEY NOT NULL,
        firstNot INTEGER,
        midNot INTEGER,
        lastNot INTEGER
        );
    `);
    // }

    return db;
}

export async function allRows() {
    const goals = await db.getAllAsync('SELECT * FROM config');
    console.log("Current goals: ", JSON.stringify(goals, null, 2));
};

export async function setNotif(firstNot, lastNot) {
    const db = await initDatabase();
    console.log("Here")
    const notifications = await db.runAsync(
        'INSERT INTO config (firstNot, lastNot) VALUES (?, ?);',
        [firstNot, lastNot]
    );

    return notifications.lastInsertRowId;
}

export async function lastRow(){
    const info = await db.prepare('SELECT * FROM config');
    return info.lastInsertRowId();
}