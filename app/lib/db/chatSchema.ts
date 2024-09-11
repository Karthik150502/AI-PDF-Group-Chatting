import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { User } from "./schema";


export const Chat = pgTable("Chat", {
    id: serial("id").primaryKey(),
    participants: serial("participantids").primaryKey().references(() => User.id).array().default([]),
    fileKey: text("fileKey").notNull(),
    isRoom: boolean("is_a_room").default(false),
    fileName: text("fileName").notNull(),
    pdfUrl: text("pdfurl").notNull(),
    createdBy: serial("userid").primaryKey().references(() => User.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});




