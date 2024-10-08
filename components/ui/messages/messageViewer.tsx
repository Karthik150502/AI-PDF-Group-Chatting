'use client'
import React, { useState } from 'react'
import "./styles.css"
import MessageViewerHeader from "../messageViewerHeader/msgViewerHeader"
import SystemMessage from './SystemMessage/SystemMessage'
import IncomingMessage from './IncomingMessage/IncomingMessage'
import OutgoingMessage from './OutgoingMessage/OutgoingMessage'
import { MsgViewType } from '@/app/lib/definitions'

import ChatBar from './ChatInput/ChatBar';

type Props = {
    messages: MsgViewType[],
    userid?: string,
    chatid: number
}
export default function ({ messages, userid, chatid }: Props) {


    console.log(userid)
    React.useEffect(() => {
        const messageContainer = document.getElementById("msg-cont")
        if (messageContainer) {
            messageContainer.scrollTo({
                top: messageContainer.scrollHeight,
                behavior: "smooth"
            })
        }
    }, [messages])


    const [chat, setChat] = useState('');

    return (
        <div

            className='w-full h-full flex flex-col items-center justify-start relative'>
            <div className="w-full lg:h-[10vh] md:h-[5vh] sm:h-[5vh] xs-[5vh]  flex items-center">
                <MessageViewerHeader chatid={chatid} />
            </div>
            <div className="w-full lg:max-h-[80vh] lg:h-[80vh] md:max-h-[40vh] md:h-[40vh] sm:max-h-[40vh] sm:h-[40vh] xs:max-h-[40vh] xs:h-[40vh] overflow-y-scroll flex flex-col items-center justify-start gap-y-3  px-2 py-2 scrollbar" id="msg-cont">
                {
                    messages.map((msg) => {
                        return (
                            '111' === String(msg.sentBy) ? <OutgoingMessage key={msg.sentAt} message={msg.message} sentAt={msg.sentAt} /> : (
                                msg.role === "SYSTEM" ? <SystemMessage key={msg.sentAt} message={msg.message} sentAt={msg.sentAt} /> : <IncomingMessage key={msg.sentAt} message={msg.message} sentAt={msg.sentAt} />
                            )
                        )
                    })
                }
            </div>
            <ChatBar setChat={setChat} />
        </div >
    )
}
