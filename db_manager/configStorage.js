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

    // console.log(!db)

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
};

export async function setNotif(firstNot, lastNot) {
    const db = await initDatabase();
    const checkExist = await db.runAsync('SELECT id FROM config WHERE id = 1;');

    if (checkExist.lastInsertRowId > 0) {
        //this is for if the database has already been initialized
        
        await db.runAsync(
            'UPDATE config SET (firstNot, lastNot) = (?, ?) WHERE id = 1;',
            [firstNot, lastNot]
        )

    } else {
        //this is for if database has not been initialized
        await db.runAsync(
            'INSERT INTO config (firstNot, lastNot) VALUES (?, ?);',
            [firstNot, lastNot]
        );
    }

}

//honestly unsure what's the function of this function (ba dum tss) at this point
export async function getNotificationTime() {
    const db = await initDatabase();
    const times = await db.getAllAsync('SELECT MIN(id), firstNot, lastNot FROM config');
    // console.log("Times "+JSON.stringify(times));
    return times;
}

export async function clearConfig() {
    await db.runAsync('DELET FROM config');

    console.log("Config cleared");
}