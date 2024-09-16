'use client'
import React from 'react'
import ChatsViewer from '@/components/ui/chatsViewer/chatsViewer'
import { useState } from 'react';
import clsx from "clsx";
import "./styles.css"
import messageViewer from '@/components/ui/messages/messageViewer';
import MessageViewer from '@/components/ui/messages/messageViewer';
export default function page() {



    const [showChats, setShowChats] = useState<boolean>(false);
    return (
        <div className='min-h-screen bg-white w-screen relative overflow-hidden'>
            <div className={clsx("min-h-screen w-[90px] flex item-center justify-start absolute menu-transition gap-x-4 bg-transparent", showChats ? "left-0" : "left-[-160px]")}>
                <ChatsViewer showMenu={showChats} chatsToggle={setShowChats} />
            </div>
            <div className="w-full h-full bg-slate-500 flex lg:flex-row md:flex-col sm:flex-col xs:flex-col">
                <div className='lg:w-1/2 md:w-full sm:w-full xs:w-full h-full bg-red-500'></div>
                <div className='lg:w-1/2 md:w-full sm:w-full xs:w-full h-full bg-black'>
                    <MessageViewer messages={
                        [
                            {
                                id: 1,
                                role: "SYSTEM",
                                message: "Hello, how are you?",
                                sentAt: new Date(),
                                sentBy: 111,
                                chat: 9
                            },
                            {
                                id: 2,
                                role: "SYSTEM",
                                message: "How was your day?",
                                sentAt: new Date(),
                                sentBy: 111,
                                chat: 9
                            }, {
                                id: 1,
                                role: "USER",
                                message: "Went faily well.",
                                sentAt: new Date(),
                                sentBy: 111,
                                chat: 9
                            }, {
                                id: 1,
                                role: "SYSTEM",
                                message: "How well?",
                                sentAt: new Date(),
                                sentBy: 111,
                                chat: 9
                            }, {
                                id: 1,
                                role: "USER",
                                message: "Quite Well.",
                                sentAt: new Date(),
                                sentBy: 111,
                                chat: 9
                            },
                            {
                                id: 1,
                                role: "SYSTEM",
                                message: "Hello, how are you?",
                                sentAt: new Date(),
                                sentBy: 111,
                                chat: 9
                            },
                            {
                                id: 2,
                                role: "SYSTEM",
                                message: "How was your day?",
                                sentAt: new Date(),
                                sentBy: 111,
                                chat: 9
                            }, {
                                id: 1,
                                role: "USER",
                                message: "Went faily well.",
                                sentAt: new Date(),
                                sentBy: 111,
                                chat: 9
                            }, {
                                id: 1,
                                role: "SYSTEM",
                                message: "How well?",
                                sentAt: new Date(),
                                sentBy: 111,
                                chat: 9
                            }, {
                                id: 1,
                                role: "USER",
                                message: "Quite Well.",
                                sentAt: new Date(),
                                sentBy: 111,
                                chat: 9
                            },
                        ]
                    } />
                </div>
            </div>
        </div>
    )
}
