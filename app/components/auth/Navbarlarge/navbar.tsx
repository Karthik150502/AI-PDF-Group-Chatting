import React from 'react'
import Link from 'next/link'
export default function navbar() {
    return (
        <section className='w-screen h-[60px] bg-white sticky top-0 flex'>
            <div className="w-[30%] h-full">
            </div>
            <div className='w-[40%]  h-full flex px-8 justify-around items-center'>
                <Link href={"/home"} className='text-black'>Home</Link>
                <Link href={"/chats"} className='text-black'>Chats</Link>
            </div>

            <div className="w-[30%]h-full">

            </div>

        </section>
    )
}
