import { getDb } from "@/utils/DB";
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: any){
    const db = await getDb()
    const messageId = params.id;

    if (!ObjectId.isValid(messageId)) {
        return NextResponse.json({ message: 'Invalid Message ID', data: null, error: true }, { status: 400 });
    }
    const objectId = new ObjectId(messageId);
    const message = await db.collection('messages').findOneAndDelete({ _id: objectId })
    return NextResponse.json({ data: 'message', success: true, message: 'Success'}, { status: 200 })
}