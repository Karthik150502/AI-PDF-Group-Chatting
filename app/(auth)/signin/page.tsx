import React from 'react'
import SignInform from '@/components/signin/signinForm'
export default function pags() {
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-y-4'>
    <p className='text-xl'>Sign Up</p>
    <SignInform />
</div>
  )
}
