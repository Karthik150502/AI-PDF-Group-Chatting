
// import GitHubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import { db } from "@/app/lib/db"
import { User, UserType } from "@/app/lib/db/schema"
import { eq, or } from "drizzle-orm"
import { randomUUID, randomBytes } from "crypto"
import { NextAuthOptions } from 'next-auth';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';


export interface UserSession extends Session {
    user: {
        id: string;
        jwtToken: string;
        role: string;
        email: string;
        name: string;
    };
}

interface Token extends JWT {
    uid: string;
    jwtToken: string;
}



interface tokenUser {
    id: string;
    name: string;
    email: string;
    token: string;
}


export const options = {
    providers: [
        // GitHubProvider(),



        // GoogleProvider(),


        CredentialProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "username",
                    type: "text",
                    placeholder: "username"
                },
                email: {
                    label: "email",
                    type: "email",
                    placeholder: "email"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password"
                },
            },

            async authorize(creds) {
                const user = await db.select().from(User).where(or(eq(User.username, creds?.username!), eq(User.email, creds?.email!)));
                if (user) {
                    return user[0]
                }
                return null;
            }
        })
    ],

    session: {
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 2 * 60 * 60, // 2 Hours

    },

    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            const newToken: Token = token as Token;
            // Generating the body for the jwt to sign.
            if (user) {
                newToken.uid = user.id;
                newToken.jwtToken = (user as tokenUser).token;
            }
            return newToken
        },



        async session({ session, token }: { session: any, token: any }) {
            const newSession: UserSession = session as UserSession;
            // Returning some data to utilize in the session.
            if ((newSession.user && token.uid)) {
                newSession.user.id = token.uid
                newSession.user.name = token.name
                newSession.user.email = token.email
            }
            return newSession
        }
    },
    pages: { signIn: '/signin', newUser: "/home", error: "/error" },


} 