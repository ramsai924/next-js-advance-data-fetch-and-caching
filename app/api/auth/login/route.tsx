import { getDb } from "@/utils/DB";
import { encrypt } from "@/utils/authentication";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest){
    try {
        const userData = await request.json()
        const db = await getDb()
        const user = await db.collection('users').findOne({ email: userData.email })
        if(user){
            const isValidPassword: boolean = await bcrypt.compareSync(userData.password, user.password)
            if(isValidPassword){
                const userDataValid = {...user}
                delete userDataValid.password
                const expireTime = new Date(new Date().getTime() + 30 * 60 * 1000);
                const token = await encrypt({userData: userDataValid, expireTime})
                return NextResponse.json({ message: 'Register success', data: token, success: true }, { status: 201 })
            }else{
                return NextResponse.json({ message: 'Invalid password', data: null, success: false }, { status: 200 })
            }
        }else{
            return NextResponse.json({ message: 'User Not found', data: null, success: false }, { status: 200 })
        }
    } catch (error) {
        console.log('first', error)
        return NextResponse.json({ message: 'Something went wrong', data: null, success: false }, { status: 500 })
    }
}