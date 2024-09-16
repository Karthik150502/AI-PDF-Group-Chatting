'use client'
import React from 'react'
import { useState } from 'react'
import clsx from 'clsx';
import { Notebook, X } from 'lucide-react'
export default function ChatsViewer({ chatsToggle, showMenu }: { chatsToggle: (arg: boolean) => void, showMenu: boolean }) {



    return (
        <section className="min-h-screen w-[210px] flex items-start justify-center">
            <div className="h-full w-[160px] bg-slate-950 "></div>
            <div className="bg-black opacity-30 flex items-center justify-center rounded-full w-[30px] h-[30px] cursor-pointer m-[10px] hover:opacity-100 transition-opacity duration-500">
                {
                    showMenu ? <X strokeWidth={1} size={15} onClick={() => chatsToggle(false)} className='text-white' /> : <Notebook strokeWidth={1} size={15} onClick={() => chatsToggle(true)} className='text-white' />
                }
            </div>
        </section>
    )
}
