import { db } from "@/app/lib/db";
import { Chat, Participant } from "@/app/lib/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { options } from "../auth/[...nextauth]/options";
import { S3Handler } from "@/packages/s3/s3main";
export async function POST(req: Request, res: Response) {




    const session = await getServerSession(options);
    if (session) {
        // Signed in
        console.log("Session", JSON.stringify(session, null, 2))
    } else {
        // Not Signed in
        return NextResponse.json({
            error: "Unauthorized"
        }, { status: 401 })
    }
    try {

        const s3 = S3Handler.getInstance()
        const body = await req.json();
        const { fileKey, fileName, createdBy } = body;



        const chat = await db.insert(Chat).values({
            fileKey: fileKey,
            fileName: fileName,
            pdfUrl: s3.getUrl(fileKey),
            createdBy,
        }).returning({
            chatid: Chat.id
        })
        const participant = await db.insert(Participant).values({
            chat: chat[0].chatid,
            participant: createdBy
        }).returning({
            participantid: Participant.id
        })
        console.log("Chat created from the api = ", chat);

        return NextResponse.json({ chat: chat[0], participant: participant[0] }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}