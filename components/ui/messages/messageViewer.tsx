'use client'
import React from 'react'
import { MessageType } from '@/app/lib/db/schema'
import "./styles.css"
import MessageViewerHeader from "../messageViewerHeader/msgViewerHeader"
export default function ({ messages }: { messages: MessageType[] }) {

    React.useEffect(() => {
        const messageContainer = document.getElementById("msg-cont")
        if (messageContainer) {
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: "smooth"
            })
        }
    }, [messages])


    return (
        <div className='w-full h-full flex flex-col items-center justify-start relative'>
            <div className="w-full absolute top-0">
                <MessageViewerHeader />
            </div>
            <div className="w-full h-[80%] overflow-y-scroll flex flex-col items-center justify-start gap-y-3  px-2 py-2 scrollbar" id="msg-cont">

                {
                    messages.map((msg) => {
                        return (
                            msg.role === "SYSTEM" ? <div key={msg.sentAt.getTime()} className='flex flex-col w-full justify-center items-start'>
                                <div className="min-w-fit max-w-2/3 rounded-md  text-sm flex items-start justify-start gap-x-2">
                                    <div className="w-[20px] h-[20px] rounded-full bg-red-500">
                                    </div>
                                    <p className='text-white'>{msg.message}</p>
                                </div>
                                <p className="text-[8px] float-right mt-1 text-slate-400">{msg.sentAt.toLocaleTimeString()}</p>
                            </div> : <div className='flex flex-col w-full max-w-2/3 justify-center items-end'>
                                <div className=" min-w-fit rounded-md text-white text-sm">
                                    {msg.message}
                                </div>
                                <p className="text-[8px] float-left mt-1 text-slate-400">{msg.sentAt.toLocaleTimeString()} | {msg.sentBy}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className='w-full h-[20%]'>

            </div>
        </div >
    )
}
