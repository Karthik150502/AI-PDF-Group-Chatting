import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function (req) {
        console.log("Middleware...")
        const token = req.nextauth.token;
        console.log("token = ", token)
        if (!token) {
            return NextResponse.redirect(new URL('/invalidsession', req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        }
    },


)


export const config = { matcher: ['/home/:path*'] }
// export const config = { matcher: ['/home/:path*', '/chats/:path*'] }
