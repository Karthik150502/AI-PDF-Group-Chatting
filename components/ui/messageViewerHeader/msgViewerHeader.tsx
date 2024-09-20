'use client'
import React from 'react'
import ToggleSwitch from '../toggleSwitch/toggleSwitch'
import MsgViewerOptions from '../messsageViewerOptions/MsgViewerOptions'
import { getChat } from '@/app/lib/chats/chats'
export default function MsgViewerHeader({ chatid }: { chatid: number }) {





    return (
        <div className="w-full h-hull flex items-center lg:justify-between md:justify-end xs:justify-end sm:justify-end bg-black px-4">
            <ToggleSwitch />
            <p className="text-xl text-white">

            </p>
            <MsgViewerOptions />
        </div>
    )
}
