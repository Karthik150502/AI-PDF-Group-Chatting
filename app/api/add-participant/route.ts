import { db } from "@/app/lib/db";
import { Participant } from "@/app/lib/db/schema";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { options } from "../auth/[...nextauth]/options";
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
        const body = await req.json();
        const { userid, chatid } = body;
        const participant = await db.insert(Participant).values({
            chat: chatid,
            participant: userid
        }).returning({
            participantid: Participant.id
        })

        return NextResponse.json({ participant: participant[0] }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Internal server error, participant cannot be added." },
            { status: 500 }
        )
    }
}