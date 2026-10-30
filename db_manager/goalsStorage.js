import * as SQLite from 'expo-sqlite';

const db_path = 'goals.db';


let db = null;

async function databaseInitialization(){
    if (!db){
        db = await SQLite.openDatabaseAsync(db_path);
    }
    return db;
}

// db = databaseInitialization();

initDatabase();

export async function initDatabase() {
    db = await databaseInitialization();

    if (!db) {
        //await cannot be called outside of an async function
        // db = await SQLite.openDatabaseAsync('goals.db');
        await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS goals (
        id INTEGER PRIMARY KEY NOT NULL,
        goalText TEXT NOT NULL,
        date TEXT NOT NULL,
        accomplished INTEGER
        );
    `);
    }
}


export async function allRows(){
    const goals = await db.getAllAsync('SELECT * FROM goals');
    console.log("Current goals: ", JSON.stringify(goals, null, 2));
};


export async function getGoal(id) {
    const goal = db.prepare('SELECT * FROM goals WHERE goals.id=?', [id]);
    return goal;
};

export async function getAllGoalsDaily(date) {
    const allGoals = await db.getAllAsync('SELECT accomplished FROM goals WHERE goals.date=?', [date]);
    console.log(allGoals)
    const allGoalsValue = allGoals.map(row => row.accomplished);
    return allGoalsValue;
}

export async function setAccomplished(goalText, id){
    await db.runAsync('UPDATE goals SET accomplished = CASE WHEN accomplished = 1 THEN 0 ELSE 1 END WHERE goals.goalText=? AND goals.id=?', [goalText, id])
    console.log(goalText + "accomplished")
}

export async function getAccomplished(id){
    const accomp = await db.getFirstAsync('SELECT accomplished FROM goals WHERE goals.id=?', [id]);
    console.log("Accomp  "+ accomp.accomplished)
    return accomp.accomplished;
}

export async function getGoalWithDate(date) {
    // db = await databaseInitialization();

    const goalDates = await db.getAllAsync('SELECT * FROM goals WHERE goals.date=?', [date]);
    // console.log(goalDates);
    return goalDates;
};

export async function setGoal(goalText, date, accomplished) {
    const result = await db.runAsync(
        'INSERT INTO goals (goalText, date, accomplished) VALUES (?,?,?);',
        [goalText, date, accomplished]
    );

    return result.lastInsertRowId;
};

export async function clearDatabase() {
    await db.runAsync('DELETE FROM goals;')

    console.log("Database cleaned")
}