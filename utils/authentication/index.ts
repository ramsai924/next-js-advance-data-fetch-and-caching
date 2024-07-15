import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
const SECRET_KEY = 'ramsai960916'
const key = new TextEncoder().encode(SECRET_KEY)

export const encrypt = async (payload: any) => {
    return await new SignJWT(payload).setExpirationTime('30 min').setProtectedHeader({ alg: 'HS256' }).setIssuedAt().sign(key)
}

export const decrypt = async (session: string) => {
   try {
     const { payload } = await jwtVerify(session, key, { 
        algorithms: ['HS256']
    })

    return payload;
   } catch (error) {
    return null
   }
}

export async function validateUser(request: NextRequest) {
  try {
      {
    /*
    Note: 
    - Using Next.js API's:
      When using middleware to authenticate the token from Next.js itself (not from external APIs like .NET or Spring Boot), 
      we should use the logic with `decrypt` to validate the token.

    - Using External APIs:
      If using external backend servers for token validation, remove the `decrypt` validation here. 
      Token validation will be handled by the external backend server. 
      If the API returns a 401 status, we can directly redirect the user to the /auth page.
    */
  }
   const session = request.cookies.get("user_session")?.value || '';
   const path = request.nextUrl.pathname;
   const isPublic = path === '/login' || path === '/register'
   const parsed: any = await decrypt(session);
   if (!session && !isPublic && parsed === null){
    //  console.log('parsed')
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

   if (session && isPublic && parsed !== null){
     return NextResponse.redirect(new URL('/home', request.nextUrl))
    }
    
  if(!isPublic && parsed === null){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }

 

  const res = NextResponse.next()
 
  return res;
  } catch (error) {
    console.log('middleware', error)
  }
}

export async function  logoutUser(){
  cookies().delete('user_session')
}
