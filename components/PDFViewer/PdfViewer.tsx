import React from 'react'

type Props = {
    chatid: string
}
import { getChat } from '@/app/lib/chats/chats';


export default async function PDFViewer({ chatid }: Props) {

    let pdfUrl = await getChat(7)



    return (
        <iframe src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`} className='w-full h-full'>
        </iframe>
    )
}
