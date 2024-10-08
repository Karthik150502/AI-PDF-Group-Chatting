import React from 'react'
import { BackgroundLines } from '@/components/ui/background-lines'
import { FileUpload } from '@/components/fileHandling/file-upload'
import LandingTitle from '@/components/ui/landingTitle'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

export default async function page() {



    const session = await getServerSession(options)

    if (!session) {
        redirect("/api/auth/signin?/callbackUrl=/home")
    }



    return (
        <section className='h-full sm:pt-[250px] lg:pt-0 md:pt-0 xs:pt-[350px] bg-transparent'>
            <BackgroundLines children={<InnerElement userid={session?.user?.id} />} className='bg-transparent' />
        </section>
    )
}


function InnerElement({ userid }: { userid: string }) {
    return <div className='w-full h-full flex items-center justify-center flex-col'>
        <LandingTitle />
        <div

            className='min-w-[340px] max-w-[420px] w-[380px] h-auto flex items-center justify-center'>
            <FileUpload userid={userid} />
        </div>
    </div>
}