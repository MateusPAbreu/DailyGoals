import * as SQLite from 'expo-sqlite';

const db = await SQLite

//Remember to worry about SQL injection
await db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS goals (
        id INTEGER PRIMARY KEY NOT NULL, 
        goalText TEXT NOT NULL, 
        date DATETIME, 
        accomplished INTEGER
        )
`);

export function getGoal(id){
    const goal = db.prepare('SELECT * FROM goals WHERE goal.id=?').get(id)

    return goal
}

export function setGoal(goalText, date, accomplished){
    db.prepare('INSERT INTO goals (goalText, date, accomplished) VALUES (?,?,?);'), [goalText, date, accomplished]
}
