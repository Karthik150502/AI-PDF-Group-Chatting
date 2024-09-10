import React from 'react'
import SignUpform from '@/components/signup/signinform'
export default function page() {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center gap-y-4'>
            <p className='text-xl'>Sign Up</p>
            <SignUpform />
        </div>
    )
}
