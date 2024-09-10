import React from 'react'
import { BackgroundLines } from '@/components/ui/background-lines'
import { FileUpload } from '@/components/ui/file-upload'
import Link from 'next/link'
import { Badge } from 'lucide-react'
export default function page() {



    return (
        <section className='w-full h-full sm:pt-[250px] lg:pt-0 md:pt-0 xs:pt-[350px]'>
            <BackgroundLines children={<InnerElement />} className='bg-slate-950' />
        </section>
    )
}


function InnerElement() {
    return <div className='w-full h-full flex items-center justify-center flex-col'>
        <p className='text-4xl text-white py-4 text-clip'>Welcome</p>
        <div className='min-w-[340px] max-w-[420px] w-[380px] h-auto flex items-center justify-center'>
            <FileUpload />
        </div>
    </div>
}