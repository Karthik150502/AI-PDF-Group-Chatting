
import React from 'react'
import ChatsViewer from '@/components/ui/chatsViewer/chatsViewer';
import "./styles.css"
import PDFViewer from '@/components/PDFViewer/PdfViewer';
import MessageViewer from '@/components/ui/messages/messageViewer';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { UserSystemEnum } from '@/app/lib/definitions';

type Params = {
    params: {
        chatid: string;
    };
}
import { Suspense } from 'react';
import PDFViewerSkeleton from '@/components/PDFViewer/PdfLoader';


import { getChat } from '@/app/lib/chats/chats';

export default async function page({ params: { chatid } }: Params) {
    const session = await getServerSession(options);
    console.log(chatid)
    let chat = await getChat(chatid)

    return (
        <div className='min-h-screen bg-white w-screen relative overflow-hidden'>

            <ChatsViewer />

            <div className="w-full h-full bg-slate-500 flex lg:flex-row md:flex-col sm:flex-col xs:flex-col">
                <div className='lg:w-1/2 md:w-full sm:w-full xs:w-full lg:h-full md:h-1/2 sm:h-1/2 xs:h-1/2 bg-red-500'>

                    <Suspense fallback={<PDFViewerSkeleton />}>
                        <PDFViewer pdfUrl={chat.pdfUrl} />
                    </Suspense>
                </div>
                <div className='lg:w-1/2 md:w-full sm:w-full xs:w-full lg:h-full md:h-1/2 sm:h-1/2 xs:h-1/2  bg-black'>
                    <MessageViewer chatid={chat.id} userid={session?.user?.id} messages={
                        [
                            {
                                id: 1,
                                role: UserSystemEnum.SYSTEM,
                                message: "Hello, how are you?",
                                sentAt: new Date().toLocaleDateString(),
                                sentBy: 115,
                                chat: 9
                            },
                            {
                                id: 2,
                                role: UserSystemEnum.SYSTEM,
                                message: "How was your day?",
                                sentAt: new Date().toLocaleDateString(),
                                sentBy: 115,
                                chat: 9
                            }, {
                                id: 1,
                                role: UserSystemEnum.USER,
                                message: "Went faily well.",
                                sentAt: new Date().toLocaleDateString(),
                                sentBy: 111,
                                chat: 9
                            }, {
                                id: 1,
                                role: UserSystemEnum.SYSTEM,
                                message: "How well?",
                                sentAt: new Date().toLocaleDateString(),
                                sentBy: 115,
                                chat: 9
                            }, {
                                id: 1,
                                role: UserSystemEnum.USER,
                                message: "Quite Well.",
                                sentAt: new Date().toLocaleDateString(),
                                sentBy: 111,
                                chat: 9
                            },
                            {
                                id: 1,
                                role: UserSystemEnum.SYSTEM,
                                message: "Hello, how are you?",
                                sentAt: new Date().toLocaleDateString(),
                                sentBy: 115,
                                chat: 9
                            },
                            {
                                id: 2,
                                role: UserSystemEnum.SYSTEM,
                                message: "How was your day?",
                                sentAt: new Date().toLocaleDateString(),
                                sentBy: 115,
                                chat: 9
                            }, {
                                id: 1,
                                role: UserSystemEnum.USER,
                                message: "Went faily well.",
                                sentAt: new Date().toLocaleDateString(),
                                sentBy: 111,
                                chat: 9
                            }, {
                                id: 1,
                                role: UserSystemEnum.SYSTEM,
                                message: "How well?",
                                sentAt: new Date().toLocaleDateString(),
                                sentBy: 115,
                                chat: 9
                            }, {
                                id: 1,
                                role: UserSystemEnum.USER,
                                message: "Quite Well.",
                                sentAt: new Date().toLocaleDateString(),
                                sentBy: 111,
                                chat: 9
                            },
                            {
                                id: 1,
                                role: UserSystemEnum.USER,
                                message: "Quite Well.",
                                sentAt: new Date().toLocaleDateString(),
                                sentBy: 111,
                                chat: 9
                            },
                            {
                                id: 1,
                                role: UserSystemEnum.USER,
                                message: "Quite Well.",
                                sentAt: new Date().toLocaleDateString(),
                                sentBy: 112,
                                chat: 9
                            },
                            {
                                id: 1,
                                role: UserSystemEnum.USER,
                                message: "Quite Well.",
                                sentAt: new Date().toLocaleDateString(),
                                sentBy: 112,
                                chat: 9
                            },

                        ]
                    } />
                </div>
            </div>
        </div>
    )
}
