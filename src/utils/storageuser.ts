import { User } from "discord.js"
import fs from "fs"
import path from "path"

const DATA_PATH = path.join(__dirname, "..", "db", "users.json")

export type UserSettings = {
    coins: number,
    compleanno: string,
    livello: number,
    xp: number,
    ticket: boolean,
    pro: boolean,    
}

export type DB = {
    users: Record<string, UserSettings>
}

const defaultUsers: UserSettings = {
    coins: 0,
    compleanno: "non settato",
    livello: 0,
    xp: 0,
    ticket: false,
    pro: false
}

const defaultDB: DB = {
    users: {}
}

function readDB(): DB {
  try {
    if (!fs.existsSync(DATA_PATH)) return defaultDB;

    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    if (!raw.trim()) return defaultDB;

    const parsed = JSON.parse(raw) as Partial<DB>;

    return {
      users: parsed.users ?? {},
    };
  } catch {
    return defaultDB;
  }
}

function writeDB(db: DB) {
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(db, null, 2), "utf-8");
}

function normalizeUser(data?: Partial<UserSettings>): UserSettings {
  return {
    ...defaultUsers,
    ...data,
  };
}

let db: DB = readDB();

export function getUser(user: string): UserSettings{
    if(!db.users[user]){
        db.users[user] = normalizeUser()
        writeDB(db)
    }

    return db.users[user]
}

export function setUser(user: string, data: Partial<UserSettings>): UserSettings{
    const current = getUser(user)
    db.users[user] = {...current, ...data}
    writeDB(db)
    return db.users[user]
}

export function removeUser(user: string) {
    delete db.users[user]
    writeDB(db)
}

export function flush() {
  writeDB(db);
}

