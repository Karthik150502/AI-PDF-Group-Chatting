
// import GitHubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import { db } from "@/app/lib/db"
import { User, UserType } from "@/app/lib/db/schema"
import { eq, or } from "drizzle-orm"
import { randomUUID, randomBytes } from "crypto"
import { Awaitable } from "next-auth"
import { callbackify } from "util"


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
                console.log("Credentials from authorize callback = ", creds)
                const user = await db.select().from(User).where(or(eq(User.username, creds?.username!), eq(User.email, creds?.email!)));
                if (user) {
                    return user[0]
                }
                return null;
            }
        })
    ],



    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            let users = await db.select().from(User).where(eq(User.id, user.id))
            let userFound = users[0];
            if (!userFound) {
                return token
            }

            return {
                id: userFound.id,
                name: userFound.username,
                email: userFound.email,
                createdAt: userFound.createdAt
            }
        },
        async session({ session, token }: { session: any, token: any }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.createdAt = token.createdAt
            }
            return session
        }
    },
    pages: { signIn: '/signin', newUser: "/signup" },


} 