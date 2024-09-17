'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SignInType } from '@/app/lib/validation';
import { SignupFormResult, SignInFormResult } from '@/app/lib/definitions';
import { verifyUser } from '@/app/lib/userActions';
import { signIn } from 'next-auth/react';
import { signin as signinValidator } from '@/app/lib/validateData';
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "./styles.css"
import ErrorMsg from '../ui/errorMsg';
export default function SignInform() {

    const router = useRouter()
    const [formData, setFormData] = useState<SignInType>({} as SignInType);
    const [showPwd, setShowPwd] = useState<boolean>(false);
    const [signInRes, setSignInRes] = useState<SignInFormResult>({} as SignInFormResult);


    const handleChange = (e: EventTarget & HTMLInputElement) => {
        const { name, value } = e;
        setFormData(prev => {
            return {
                ...formData,
                [name]: value
            }
        })
    }


    const handleSubmit = async (event: React.FormEvent) => {


        event.preventDefault()
        setSignInRes({} as SignupFormResult)

        // const errorRes = validateSignUpData(formData)
        const errorRes = signinValidator(formData)
        if (errorRes) {
            setSignInRes(errorRes)
            return
        }

        const { useroremail, password } = formData;

        const response = await verifyUser(formData);

        if (response.status != 200) {
            setSignInRes({
                errors: {},
                message: response.message,
            })
            return
        }


        let res = await signIn('credentials', { email: useroremail, username: useroremail, password,  redirect: false });
        if (res) {
            router.push("/home");
            router.refresh()
        }

        return

    }


    const copyCreds = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (e.target?.id == "copy-username") {
            window.navigator.clipboard.writeText("karthik_150502");
        }
        if (e.target?.id == "copy-email") {
            window.navigator.clipboard.writeText("karthikrdy150502@gmail.com");
        }
        if (e.target?.id == "copy-pwd") {
            window.navigator.clipboard.writeText("Karthik@150502");
        }
    }

    return (
        <section className='min-w-[320px] w-[340px] max-w-[400px] h-auto flex items-center justify-center signin-bg p-4 rounded-none'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-y-3 w-full'>


                <button onClick={(e) => copyCreds(e)} id="copy-username" type="button">Copy username</button>
                <button onClick={(e) => copyCreds(e)} id="copy-email" type="button">Copy Email</button>
                <label htmlFor="useroremail" className='flex flex-col items-start justify-center w-full gap-y-1'>
                    <p className='text-white text-xs ml-2'>Username</p>
                    <Input onChange={(e) => handleChange(e.target)} name='useroremail' type='text' id='useroremail' placeholder='Username or Email' className="rounded-full "></Input>
                    {
                        signInRes.errors?.useroremail && <ErrorMsg message={signInRes.errors?.useroremail[0]} />
                    }
                </label>
                <button onClick={(e) => copyCreds(e)} id="copy-pwd" type="button">Copy Password</button>
                <label htmlFor="password" className='flex flex-col items-start justify-center w-full relative gap-y-1'>
                    <p className='text-white text-xs ml-2'>Password</p>
                    <Input onChange={(e) => handleChange(e.target)} name='password' type={showPwd ? "text" : "password"} id='password' placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" className="rounded-full"></Input>
                    {
                        signInRes.errors?.password && <ErrorMsg message={signInRes.errors?.password[0]} />
                    }
                    {
                        showPwd ? <Eye strokeWidth={1} size={20} onClick={() => setShowPwd(false)} className='absolute right-2 top-[28px]' /> : <EyeOff strokeWidth={1} size={20} onClick={() => setShowPwd(true)} className='absolute right-2 top-[28px]' />
                    }
                </label>
                <div className="h-auto text-center">
                    {
                        signInRes?.message && <p className='w-full text-xs mt-1 text-white mr-2 text-center'><i>
                            {signInRes.message}</i></p>
                    }
                </div>
                <Button type='submit' className='rounded-full mt-2'>Submit</Button>
                <div className="w-full h-auto mt-2 text-center text-[0.75rem]">
                    <p>New to DocAI? register <Link href="/signup" className='text-teal-500 hover:text-teal-300'>here</Link></p>
                </div>
            </form>
        </section >
    )
}
