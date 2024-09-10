
import { SignUpType, Signupform, SignInType, Signinform } from "./validation"
import { SignupFormResult, SignInFormResult } from "./definitions"




export function signup(formData: SignUpType): SignupFormResult | null {
    const validation = Signupform.safeParse(formData)
    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors,
        }
    }
    return null
}


export function signin(formData: SignInType): SignInFormResult | null {
    const validation = Signinform.safeParse(formData)
    if (!validation.success) {
        return {
            errors: validation.error.flatten().fieldErrors,
        }
    }

    return null
}