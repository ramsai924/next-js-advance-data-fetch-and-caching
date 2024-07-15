import { validBEToken } from "@/utils";
import { getDb } from "@/utils/DB";
import { decrypt } from "@/utils/authentication";
import { parse } from "cookie";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    console.log('fetching messages----')
    try {
        const token = request.headers.get('authorization')?.split(' ')[1] || '';
        const user: any = await decrypt(token)
        if(user === null){
            return NextResponse.json({ data: null, success: false, message: 'Unauthorized'}, { status: 401 })
        }
        const db = await getDb()
        const messages = await db.collection('messages').find({ user_id: user?.userData?._id }).toArray()
        return NextResponse.json({ data: messages, success: true, message: 'Success'}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ data: error, success: true, message: 'Fail'}, { status: 500 })
    }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get('authorization')?.split(' ')[1] || '';
    const user: any = await decrypt(token);

    // if (!user) {
    //   return NextResponse.json(
    //     { data: null, success: false, message: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    const db = await getDb();
    const reqObj = await request.json();
    reqObj.user_id = user?.userData?._id;
    const message = await db.collection('messages').insertOne(reqObj);

    return NextResponse.json(
      { data: message, success: true, message: 'Success' },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { data: null, success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
