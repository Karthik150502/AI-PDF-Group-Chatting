import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, varchar, PgArray } from "drizzle-orm/pg-core"
export const UserSystemEnum = pgEnum("user_system_enum", ["SYSTEM", "USER"])

export const User = pgTable("User", {
    id: serial("id").primaryKey(),
    fullname: varchar("fullname", { length: 256 }).notNull(),
    username: varchar("username", { length: 256 }).notNull().unique(),
    email: varchar("email", { length: 256 }).notNull().unique(),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
})


export const Chat = pgTable("Chat", {
    id: serial("id").primaryKey(),
    fileKey: text("file_key").notNull(),
    isRoom: boolean("is_a_room").default(false),
    fileName: text("file_name").notNull(),
    pdfUrl: text("pdfurl").notNull(),
    createdBy: serial("created_by").references(() => User.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});




export type UserType = typeof User.$inferSelect;

export const Message = pgTable("Message", {
    id: serial("id").primaryKey(),
    chat: serial("chatid").references(() => Chat.id),
    sentBy: serial("userid").references(() => User.id),
    message: text("message").notNull(),
    sentAt: timestamp("sent_at").notNull().defaultNow(),
    role: UserSystemEnum("role").notNull(),
})

export type MessageType = typeof Message.$inferSelect;



export const Participant = pgTable("participant", {
    id: serial("id").primaryKey(),
    chat: serial("chatid").references(() => Chat.id),
    participant: serial("participant").references(() => User.id),
})





