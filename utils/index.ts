import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./authentication";


export async function validBEToken (req: NextRequest) {
    const token = req.headers.get('authorization')?.split(' ')[1] || ''
 
    if(!token){
        return NextResponse.json({ message: 'Unauthorized', success: false, data: null }, { status: 401 })
    }
    const validToken = await decrypt(token)
    if(validToken === null){
        return NextResponse.json({ message: 'Unauthorized', success: false, data: null }, { status: 401 })
    }

    return true
}