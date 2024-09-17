
import React from 'react'
import ChatsViewer from '@/components/ui/chatsViewer/chatsViewer'
    ;
import "./styles.css"
import PDFViewer from '@/components/PDFViewer/PdfViewer';
import MessageViewer from '@/components/ui/messages/messageViewer';


type Params = {
    chatid: string
}


import { Suspense } from 'react';
import PDFViewerSkeleton from '@/components/PDFViewer/PdfLoader';
export default async function page({ chatid }: Params) {

    console.log("Chatsid = ", chatid)

    return (
        <div className='min-h-screen bg-white w-screen relative overflow-hidden'>

            <ChatsViewer />

            <div className="w-full h-full bg-slate-500 flex lg:flex-row md:flex-col sm:flex-col xs:flex-col">
                <div className='lg:w-1/2 md:w-full sm:w-full xs:w-full h-full bg-red-500'>

                    <Suspense fallback={<PDFViewerSkeleton />}>
                        <PDFViewer chatid={chatid} />
                    </Suspense>
                </div>
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
                            {
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
