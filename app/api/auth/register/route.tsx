import { getDb } from "@/utils/DB";
import { encrypt } from "@/utils/authentication";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest){
    try {
        const userData = await request.json()
    userData.password = await bcrypt.hashSync(userData.password, 10)
    const db = await getDb()
    const user = await db.collection('users').insertOne(userData)
    userData._id = user.insertedId
    delete userData.password
    const expireTime = new Date(new Date().getTime() + 30 * 60 * 1000);
    const token = await encrypt({userData, expireTime})
    return NextResponse.json({ message: 'Register success', data: token, success: true }, { status: 201 })
    } catch (error: any) {
        console.log('err', error)
        return NextResponse.json({ message: error?.message, data: null, success: false }, { status: 500 })
    }
}