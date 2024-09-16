import { db } from "@/app/lib/db";
import { Chat, Participant } from "@/app/lib/db/schema";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { options } from "../auth/[...nextauth]/options";
import { eq } from "drizzle-orm";
export async function POST(req: Request, res: Response) {
    const session = await getServerSession(options);
    // if (session) {
    //     // Signed in
    //     console.log("Session", JSON.stringify(session, null, 2))
    // } else {
    //     // Not Signed in
    //     return NextResponse.json({
    //         error: "Unauthorized"
    //     }, { status: 401 })
    // }
    try {
        const body = await req.json();
        const { userid } = body;
        let chats = await db.select().from(Chat).innerJoin(Participant, eq(Chat.id, Participant.chat)).where(eq(Participant.participant, userid))
        // .returning({
        //     id: Chat.id,
        //     fileKey: Chat.fileKey,
        //     isRoom: Chat.isRoom,
        //     fileName: Chat.fileName,
        //     pdfUrl: Chat.pdfUrl,
        //     createdBy: Chat.createdBy,
        //     createdAt: Chat.createdAt,
        // })

        console.log("Chats = ", chats)


        return NextResponse.json({ chats: chats }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Internal server error, participant cannot be added." },
            { status: 500 }
        )
    }
}


