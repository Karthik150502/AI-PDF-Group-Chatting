import React from 'react'

export default function OutgoingMessage({ message, sentAt }: { message: string, sentAt: string }) {
    return (
        <div className='flex flex-col w-full max-w-2/3 justify-center items-end'>
            <div className=" min-w-fit text-white text-sm rounded-tl-md rounded-tr-md rounded-bl-md px-2 py-1 bg-[#01DFFC]">
                <p className='text-black text-xs'>{message}</p>
            </div>
            <p className="text-[8px] float-left mt-1 text-white">{sentAt}</p>
        </div>
    )
}
