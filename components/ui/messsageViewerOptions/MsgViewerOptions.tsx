'use client'
import React from 'react'
import { Plus, X } from 'lucide-react'
import { Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from "clsx"

export default function MsgViewerOptions() {


    const [open, openOptions] = React.useState<boolean>(false);

    return (
        <div className='relative min-w-fit min-h-fit p-4'>
            <div className={clsx("w-[25px] h-[25px] rounded-full bg-white flex items-center justify-center transition-all duration-500 cursor-pointer hover:opacity-100", open ? "rotate-0 opacity-100" : "rotate-90 opacity-30")}>
                <Settings onClick={() => openOptions(!open)} className='text-black' strokeWidth={1} size={15} />
            </div>
            {
                open && <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.3,
                        ease: "easeInOut",
                    }}
                    className='w-[60px] h-[25px] bg-white rounded-md absolute right-[40px] top-[40px]'
                >
                </motion.div>
            }
        </div >
    )
}
