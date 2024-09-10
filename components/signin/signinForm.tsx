'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SignInType } from '@/app/lib/validation';
import { SignupFormResult, SignInFormResult } from '@/app/lib/definitions';
import { verifyUser } from '@/app/lib/actions';
import { signIn } from 'next-auth/react';
import { signin as signinValidator } from '@/app/lib/validateData';
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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


        let res = await signIn('credentials', { email: useroremail, username: useroremail, password, redirect: false });
        if (res) {
            router.push("/home");
            router.refresh()
        }

        return

    }


    return (
        <section className='min-w-[320px] w-[340px] max-w-[400px] h-auto flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-y-3 w-full'>


                <label htmlFor="useroremail" className='flex flex-col items-start justify-center w-full'>
                    <p className='text-white text-sm font-extralight'>Username</p>
                    <Input onChange={(e) => handleChange(e.target)} name='useroremail' type='text' id='useroremail' placeholder='Username or Email'></Input>
                    {
                        signInRes.errors?.useroremail && signInRes.errors.useroremail.map((err: string) => {
                            return <p key={err} className='text-xs mt-1 text-red-600 animate-bounce'>{err}</p>
                        })
                    }
                </label>
                <label htmlFor="password" className='flex flex-col items-start justify-center w-full relative'>
                    <p className='text-white text-sm font-extralight'>Password</p>
                    <Input onChange={(e) => handleChange(e.target)} name='password' type={showPwd ? "text" : "password"} id='password' placeholder='Password'></Input>
                    {
                        signInRes.errors?.password && signInRes.errors.password.map((err: string) => {
                            return <p key={err} className='text-xs mt-1 text-red-600 animate-bounce'>{err}</p>
                        })
                    }
                    {
                        showPwd ? <Eye strokeWidth={1} size={20} onClick={() => setShowPwd(false)} className='absolute right-2 top-[26px]' /> : <EyeOff strokeWidth={1} size={20} onClick={() => setShowPwd(true)} className='absolute right-2 top-[26px]' />
                    }
                </label>
                <div className="w-full h-auto mt-2 text-center">
                    {
                        signInRes.message && <p className='text-xs text-red-600 animate-bounce'>{signInRes.message}</p>
                    }
                </div>
                <Button type='submit'>Submit</Button>
                <div className="w-full h-auto mt-2 text-center text-sm">
                    <p>New to DocAI? register <Link href="/signup" className='underline text-teal-500'>here.</Link></p>
                </div>
            </form>
        </section >
    )
}
