import { db } from "@/app/lib/db";
import { Message } from "@/app/lib/db/schema"
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";


export async function POST(req: Request) {
    const { chatId } = await req.json();


    try {
        const msgs = await db.select().from(Message).where(eq(Message.chat, chatId))
        return NextResponse.json({
            status: 200,
            message: "Successfully fetched the messages.",
            messages: msgs
        })
    } catch (error) {
        console.log("Error in getting the messages.")
        return NextResponse.json({
            status: 500,
            message: "Error in getting the messages.",
            messages: []
        })
    }

}