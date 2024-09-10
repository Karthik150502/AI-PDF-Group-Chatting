export type SignupFormResult = {
    errors: {
        fullname?: string[],
        username?: string[],
        email?: string[],
        password?: string[],
    },
    status?: number,
    message?: string,
    successMessage?: string
}

export type SignInFormResult = {
    errors?: {
        useroremail?: string[],
        password?: string[],
    },
    status?: number,
    message?: string,
    successMessage?: string
}
export type SignUpUser = {
    fullname: string,
    username: string,
    email: string,
    password: string,
}


export type PasswordCompliance = {
    id: number,
    text: string,
    complied: boolean
}[];