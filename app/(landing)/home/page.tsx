import React from 'react'
import { BackgroundLines } from '@/components/ui/background-lines'
import { FileUpload } from '@/components/fileHandling/file-upload'
import LandingTitle from '@/components/ui/landingTitle'
export default function page() {



    return (
        <section className='h-full sm:pt-[250px] lg:pt-0 md:pt-0 xs:pt-[350px] bg-transparent'>
            <BackgroundLines children={<InnerElement />} className='bg-transparent' />
        </section>
    )
}


function InnerElement() {
    return <div className='w-full h-full flex items-center justify-center flex-col'>
        <LandingTitle />
        <div

            className='min-w-[340px] max-w-[420px] w-[380px] h-auto flex items-center justify-center'>
            <FileUpload />
        </div>
    </div>
}