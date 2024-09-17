'use client'
import React from 'react'
import { useState } from 'react'
import clsx from 'clsx';
import { Notebook, X } from 'lucide-react'
export default function ChatsViewer() {


    const [showMenu, setShowMenu] = useState<boolean>(false);


    return (
        <div className={clsx("min-h-screen w-[90px] flex item-center justify-start absolute menu-transition gap-x-4 bg-transparent", showMenu ? "left-0" : "left-[-160px]")}>

            <section className="min-h-screen w-[210px] flex items-start justify-center">
                <div className="h-full w-[160px] bg-slate-950 "></div>
                <div className="bg-black opacity-30 flex items-center justify-center rounded-full w-[30px] h-[30px] cursor-pointer m-[10px] hover:opacity-100 transition-opacity duration-500">
                    {
                        showMenu ? <X strokeWidth={1} size={15} onClick={() => setShowMenu(false)} className='text-white' /> : <Notebook strokeWidth={1} size={15} onClick={() => setShowMenu(true)} className='text-white' />
                    }
                </div>
            </section>
        </div>
    )
}
