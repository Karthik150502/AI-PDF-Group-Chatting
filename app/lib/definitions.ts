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

export enum UserSystemEnum {
    SYSTEM = "SYSTEM",
    USER = "USER"
}


export type MsgViewType = {
    id: number,
    message: string,
    sentAt: string,
    role: UserSystemEnum.SYSTEM | UserSystemEnum.USER,
    sentBy: number,
    chat: number
}