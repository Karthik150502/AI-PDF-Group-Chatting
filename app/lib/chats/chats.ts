
import { db } from '../db';
import { Chat } from '../db/schema';
import { eq } from 'drizzle-orm';
import { unstable_cache } from 'next/cache';



export const getChat = unstable_cache(
    async (id) => {
        console.log(id)
        let chat = await db.select().from(Chat).where(eq(Chat.id, id))
        console.log("Chat = ", chat)
        return chat[0]
    },
    ['recent_chats']
);