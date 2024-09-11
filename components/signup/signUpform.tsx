'use client'
import React, { ReactEventHandler, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SignUpType } from '@/app/lib/validation';
import { SignupFormResult } from '@/app/lib/definitions';
import { handleNewUser } from '@/app/lib/actions';
import { signup as signupValidator } from '@/app/lib/validateData';
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link';



export default function SignUpform() {

    const [formData, setFormData] = useState<SignUpType>({} as SignUpType);
    const [showPwd, setShowPwd] = useState<boolean>(false);
    const [signUpRes, setSignUpRes] = useState<SignupFormResult>({} as SignupFormResult);


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
        setSignUpRes({} as SignupFormResult)

        // const errorRes = validateSignUpData(formData)
        const errorRes = signupValidator(formData)
        if (errorRes) {
            setSignUpRes(errorRes)
            return
        }

        const { fullname, username, email, password } = formData;

        const response = await handleNewUser(formData);
        console.log(response);
        if (response.status != 200) {
            setSignUpRes({
                errors: {},
                message: response.message,
            })
            return
        }



    }


    return (
        <section className='min-w-[320px] w-[340px] max-w-[400px] h-auto flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-y-3 w-full'>

                <label htmlFor="fullname" className='flex flex-col items-start justify-center w-full'>
                    <p className='text-white text-sm font-extralight'>Full Name</p>
                    <Input onChange={(e) => handleChange(e.target)} name='fullname' type='text' id='fullname' placeholder='Name'></Input>
                    {
                        signUpRes.errors?.fullname && signUpRes.errors.fullname.map((err: string) => {
                            return <p key={err} className='text-xs mt-1 text-red-600 animate-bounce'>{err}</p>
                        })
                    }
                </label>
                <label htmlFor="username" className='flex flex-col items-start justify-center w-full'>
                    <p className='text-white text-sm font-extralight'>Username</p>
                    <Input onChange={(e) => handleChange(e.target)} name='username' type='text' id='username' placeholder='Username'></Input>
                    {
                        signUpRes.errors?.username && signUpRes.errors.username.map((err: string) => {
                            return <p key={err} className='text-xs mt-1 text-red-600 animate-bounce'>{err}</p>
                        })
                    }
                </label>
                <label htmlFor="email" className='flex flex-col items-start justify-center w-full'>
                    <p className='text-white text-sm font-extralight'>Email</p>
                    <Input onChange={(e) => handleChange(e.target)} name='email' type="text" id='email' placeholder='Email'></Input>
                    {
                        signUpRes.errors?.email && signUpRes.errors.email.map((err: string) => {
                            return <p key={err} className='text-xs mt-1 text-red-600 animate-bounce'>{err}</p>
                        })
                    }

                </label>
                <label htmlFor="password" className='flex flex-col items-start justify-center w-full relative'>
                    <p className='text-white text-sm font-extralight'>Password</p>
                    <Input onChange={(e) => handleChange(e.target)} name='password' type={showPwd ? "text" : "password"} id='password' placeholder='Password'></Input>
                    {
                        signUpRes.errors?.password && signUpRes.errors.password.map((err: string) => {
                            return <p key={err} className='text-xs mt-1 text-red-600 animate-bounce'>{err}</p>
                        })
                    }
                    {
                        showPwd ? <Eye strokeWidth={1} size={20} onClick={() => setShowPwd(false)} className='absolute right-2 top-[26px]' /> : <EyeOff strokeWidth={1} size={20} onClick={() => setShowPwd(true)} className='absolute right-2 top-[26px]' />
                    }
                </label>
                <Button type='submit'>Submit</Button>
                <div className="w-full h-auto mt-2 text-center text-sm">
                    <p>Already have an account? <Link href="/signin" className='underline text-teal-500'>Sign In.</Link></p>
                </div>
            </form>
        </section >
    )
}
