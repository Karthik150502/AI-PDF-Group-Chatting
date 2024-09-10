import { z } from 'zod';



export const Signupform = z.object({
    fullname: z.string({ required_error: "Kindly enter the Name." }).min(1, 'Name must be more than one character.'),
    username: z.string({ required_error: "Kindly Enter the username." }).regex(/^[a-z0-9_]+$/, 'Username can only contain, lowercase letter, "_" and numbers'),
    email: z.string({ required_error: "Kindly enter the Email." }).email('Enter a valid email id.'),
    password: z.string({ required_error: "Password is required." }).regex(/^.{6,}$/, 'Password must contain atleast 6 characters.').regex(/^.{0,16}$/, 'Password must contain atmost 16 characters.').regex(/^(?=.*[a-z]).*$/, 'Password must contain a lowercase letter.').regex(/^(?=.*[A-Z]).*/, 'Password must contain an uppercase letter.').regex(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/, 'Password must contain a special character.').regex(/^(?=.*\d).+$/, 'Password must contain atleast one number'),
})


export type SignUpType = z.infer<typeof Signupform>

export const Signinform = z.object({
    useroremail: z.string({ required_error: 'Kindly enter the email or ussername' }),
    password: z.string({ required_error: 'Kindly enter the password.' }).min(1, 'Kindly enter the password.')
})




export type SignInType = z.infer<typeof Signinform> 