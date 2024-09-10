// import GitHubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import { db } from "@/app/lib/db"
import { User } from "@/app/lib/db/schema"
import { eq, or } from "drizzle-orm"
import { randomUUID, randomBytes } from "crypto"


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
                    return user
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        async session({ session, token }: { session: any, token: any }) {
            if (session?.user) {
                session.user.role = token.role
            }
            return session
            // try {
            // } catch (error) {
            // }
        }
    },
    pages: { signIn: '/signin' },


} 