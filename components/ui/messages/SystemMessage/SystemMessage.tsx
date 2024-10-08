import React from 'react'

export default function SystemMessage({ message, sentAt }: { message: string, sentAt: string }) {
    return (
        <div className='flex flex-col w-full justify-center items-start '>
            <div className="min-w-fit max-w-2/3 text-sm flex items-start justify-start gap-x-2 bg-white  rounded-tl-md rounded-tr-md rounded-br-md px-2 py-1">
                <div className="w-[20px] h-[20px] rounded-full bg-red-500">
                </div>
                <p className='text-black text-xs'>{message}</p>
            </div>
            <p className="text-[8px] float-right mt-1 text-white">{sentAt}</p>
        </div>
    )
}
