
import { db } from '../db';
import { Chat } from '../db/schema';
import { eq } from 'drizzle-orm';



export async function getChat(id: number) {
    console.log(id)
    let chat = await db.select().from(Chat).where(eq(Chat.id, id));
    console.log("Chat = ", chat)
    return chat[0].pdfUrl
}




