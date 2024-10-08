'use client'
import React from 'react'
import { useState } from 'react'
import clsx from 'clsx';
import { MessageCircleMore, X as CloseIcon } from 'lucide-react'
export default function ChatsViewer() {


    const [showMenu, setShowMenu] = useState<boolean>(true);


    return (
        <div className={clsx("fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 text-white transform transition-transform duration-300 ease-in-out flex flex-col", showMenu ? "translate-x-0" : "-translate-x-full")}>

            <section className="min-h-screen w-[210px] flex items-start justify-center">
                <div className="h-full w-[160px] bg-slate-950 "></div>
                <div className={clsx("bg-black opacity-30 flex items-center justify-center rounded-full w-[30px] h-[30px] cursor-pointer m-[10px] hover:opacity-100 transition-opacity duration-500 absolute -right-12", {
                    "opacity-100": showMenu,
                })}>
                    {
                        showMenu ? <CloseIcon strokeWidth={1} size={15} onClick={() => setShowMenu(false)} className='text-white' /> : <MessageCircleMore strokeWidth={1} size={15} onClick={() => setShowMenu(true)} className='text-white' />
                    }
                </div>
            </section>
        </div>
    )
}
