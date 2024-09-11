import { db } from "@/app/lib/db";
import { Chat } from "@/app/lib/db/chatSchema";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { options } from "../auth/[...nextauth]/options";
import { getS3Url } from "@/app/lib/s3/s3";
export async function POST(req: Request, res: Response) {

    const session = await getServerSession(req, res, options);
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
        const { fileKey, fileName, createdBy } = body;
        console.log("File key and file name from the API callout")


        const chat = await db.insert(Chat).values({
            fileKey: fileKey,
            fileName: fileName,
            pdfUrl: getS3Url(fileKey),
            createdBy,
        }).returning({
            chatid: Chat.id
        })

        return NextResponse.json({ chat: chat[0] }, { status: 200 })


        // return NextResponse.json({ message: "Successly uploaded." })

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}