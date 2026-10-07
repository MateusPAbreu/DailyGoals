import * as SQLite from 'expo-sqlite';

const db_path = 'goals.db'
//Gotta make the database path so it knows where to grab it from and doesn't wipe it out for every new run
const db = await SQLite.openDatabaseAsync(db_path);;

export async function initDatabase() {
    if (!db) {
        //await cannot be called outside of an async function
        // db = await SQLite.openDatabaseAsync('goals.db');
        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS goals (
        id INTEGER PRIMARY KEY NOT NULL,
        goalText TEXT NOT NULL,
        date TEXT,
        accomplished INTEGER
        );
    `);
    }
}


export async function allRows(){
    const goals = await db.getAllAsync('SELECT * FROM goals');
    console.log("Current goals: ", JSON.stringify(goals, null, 2));
}


export async function getGoal(id) {
    const goal = db.prepare('SELECT * FROM goals WHERE goals.id=?', [id]);

    return goal;
};

export async function setGoal(goalText, date, accomplished) {
    const result = await db.runAsync(
        'INSERT INTO goals (goalText, date, accomplished) VALUES (?,?,?);',
        [goalText, date, accomplished]
    );

    return result.lastInsertRowId;
};