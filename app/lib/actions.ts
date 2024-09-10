'use server';

import { SignUpType, SignInType } from "./validation";
import { db } from "./db";
import { User } from "./db/schema";
import { eq, or } from "drizzle-orm";
import { hash, compare } from 'bcryptjs';
import { sql } from "drizzle-orm";


export async function handleNewUser(formData: SignUpType) {
    const { fullname, username, email, password } = formData;



    console.log(eq(User.email, email));
    console.log(eq(User.username, username));

    let user = await db.select().from(User).where(eq(User.email, email) || eq(User.username, username));


    if (user.length) {
        return {
            status: 401,
            message: "User already exists, try another email/ username."
        }
    }

    const pwdHashed: string = await hash(password, 10)


    let newUser = await db.insert(User).values({
        fullname,
        username,
        email,
        password: pwdHashed
    })

    return {
        user: newUser,
        status: 200,
        message: "User created successfully."
    }


}

export async function verifyUser(formData: SignInType) {

    let { useroremail, password } = formData;

    // let userFound = await db.select().from(User).where(eq(User.username, useroremail) || eq(User.email, useroremail));

    // let userFound = await db.select().from(User).where(sql`${User.username} = ${useroremail} or ${User.email} = ${useroremail}`);

    let userFound = await db.select().from(User).where(or(eq(User.username, useroremail), eq(User.email, useroremail)))


    if (!userFound.length) {
        return {
            status: 400,
            message: "Username or email does not exist, kindly sign up."
        }
    }

    let user = userFound[0]

    const match = await compare(password, user.password);

    if (!match) {
        return {
            status: 400,
            message: "Password Invalid, try again."
        }
    }



    return {
        status: 200,
    }

}