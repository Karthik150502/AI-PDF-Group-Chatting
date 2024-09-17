import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    return NextResponse.json(
        { error: "Hasta la vista baby." },
        { status: 200 }
    )
}