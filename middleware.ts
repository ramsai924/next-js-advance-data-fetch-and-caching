import { NextResponse, NextRequest } from 'next/server'
import { validateUser } from '@/utils/authentication'

export async function middleware(request: NextRequest) {
    return await validateUser(request)
}

//API routes goes through middleware if the below config set:

// export const config = {
//   matcher: [
//     '/',
//     '/messages',
//     '/home',
//     '/send-message',
//     '/login',
//     '/register',
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// }

//API routes will not goes through middleware if the below config set:

export const config = {
  matcher: [
    {
      source:
        '/((?!api|_next/static|_next/image|media|fonts|favicon.ico|favicon.png).*)',
      missing: [
        // Exclude Server Actions
        { type: 'header', key: 'next-action' },
      ],
    },
  ],
}