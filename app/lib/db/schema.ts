import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { Chat } from "./chatSchema"
export const UserSystemEnum = pgEnum("user_system_enum", ["SYSTEM", "USER"])

export const User = pgTable("User", {
    id: serial("id").primaryKey(),
    fullname: varchar("fullname", { length: 256 }).notNull(),
    username: varchar("username", { length: 256 }).notNull().unique(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
})



export type UserType = typeof User.$inferSelect;

export const Message = pgTable("Message", {
    id: serial("id").primaryKey(),
    chat: serial("chatid").primaryKey().references(() => Chat.id),
    sentBy: serial("userid").primaryKey().references(() => User.id),
    sentAt: timestamp("sent_at").notNull().defaultNow(),
    role: UserSystemEnum("role").notNull(),
})