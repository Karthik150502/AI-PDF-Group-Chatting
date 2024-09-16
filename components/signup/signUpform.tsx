'use client'
import React, { ReactEventHandler, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SignUpType } from '@/app/lib/validation';
import { SignupFormResult } from '@/app/lib/definitions';
import { handleNewUser } from '@/app/lib/userActions';
import { signup as signupValidator } from '@/app/lib/validateData';
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "./styles.css"
import ErrorMsg from '../ui/errorMsg';


export default function SignUpform() {

    const [formData, setFormData] = useState<SignUpType>({} as SignUpType);
    const [showPwd, setShowPwd] = useState<boolean>(false);
    const [signUpRes, setSignUpRes] = useState<SignupFormResult>({} as SignupFormResult);
    const router = useRouter();


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

        const response = await handleNewUser({ fullname, username, email, password });
        console.log(response);
        if (response.status != 200) {
            setSignUpRes({
                errors: {},
                message: response.message,
            })
            return
        }


        router.push(`/signin`)




    }


    return (
        <section className='min-w-[320px] w-[340px] max-w-[400px] h-auto flex items-center justify-center signup-bg p-4 rounded-none'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-y-2 w-full'>

                <label htmlFor="fullname" className='flex flex-col items-start justify-center w-full gap-y-1'>
                    <p className='text-white text-xs ml-2 mb-2'>Full Name</p>
                    <Input onChange={(e) => handleChange(e.target)} name='fullname' type='text' id='fullname' placeholder='Name' className="rounded-full"></Input>
                    {
                        signUpRes.errors?.fullname && <ErrorMsg message={signUpRes.errors.fullname[0]} />
                    }
                </label>
                <label htmlFor="username" className='flex flex-col items-start justify-center w-full gap-y-1'>
                    <p className='text-white text-xs ml-2 mb-2'>Username</p>
                    <Input onChange={(e) => handleChange(e.target)} name='username' type='text' id='username' placeholder='Username' className="rounded-full"></Input>
                    {
                        signUpRes.errors?.username && <ErrorMsg message={signUpRes.errors.username[0]} />
                    }
                </label>
                <label htmlFor="email" className='flex flex-col items-start justify-center w-full gap-y-1'>
                    <p className='text-white text-xs ml-2 mb-2'>Email</p>
                    <Input onChange={(e) => handleChange(e.target)} name='email' type="text" id='email' placeholder='Email' className="rounded-full"></Input>
                    {
                        signUpRes.errors?.email && <ErrorMsg message={signUpRes.errors.email[0]} />
                    }

                </label>
                <label htmlFor="password" className='flex flex-col items-start justify-center w-full relative gap-y-1'>
                    <p className='text-white text-xs ml-2'>Password</p>
                    <Input onChange={(e) => handleChange(e.target)} name='password' type={showPwd ? "text" : "password"} id='password' placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" className="rounded-full"></Input>
                    {
                        signUpRes.errors?.password && <ErrorMsg message={signUpRes.errors.password[0]} />
                    }
                    {
                        showPwd ? <Eye strokeWidth={1} size={20} onClick={() => setShowPwd(false)} className='absolute right-2 top-[26px]' /> : <EyeOff strokeWidth={1} size={20} onClick={() => setShowPwd(true)} className='absolute right-2 top-[26px]' />
                    }
                </label>
                <Button type='submit' className='rounded-full mt-2'>Submit</Button>
                <div className="h-auto text-center">
                    {
                        signUpRes?.message && <ErrorMsg message={signUpRes.message} />
                    }
                </div>
                <div className="h-auto mt-2 text-center text-[0.75rem]">
                    <p>Already have an account? <Link href="/signin" className='text-teal-500 hover:text-teal-300'>Sign In</Link></p>
                </div>
            </form>
        </section >
    )
}
