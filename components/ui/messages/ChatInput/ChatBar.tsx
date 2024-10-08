import React, { Dispatch, SetStateAction } from 'react'
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    animate
} from "framer-motion";
import { Input } from '../../input';
import { Send } from 'lucide-react';


type Props = {
    // setVal: (val: string) => void
    setChat: Dispatch<SetStateAction<string>>
}

export default function ChatBar({ setChat }: Props) {

    const COLORS = ["#2E2516", "#34ABD1", "#C9F526"]
    const color = useMotionValue(COLORS[0]);
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 10% 0%, #01DFFC 15%, ${color})`


    const handleChange = (val: string) => {
        console.log(val)
        setChat(val)
    }

    React.useEffect(() => {
        animate(color, COLORS, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror"
        })
    }, [])

    return (
        <motion.div
            style={{
                backgroundImage
            }}
            className='w-full lg:h-[10vh] md:h-[5vh] sm:h-[5vh] xs-[5vh] bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-evenly p-4 gap-x-2'>
            <label htmlFor='send-msg' className='relative w-[90%]'>
                <Input className='text-xs text-black font-extrabold w-full placeholder:text-slate-800 placeholder:font-extrabold rounded-full pr-10 border-none outline-none focus:border-none focus:outline-none active:border-none active:outline-none' placeholder='What is this document about?' id='send-msg' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e.target.value)
                }} />
                {/* <Laugh onClick={() => {
            window
        }} strokeWidth={1} className='absolute top-1 right-2' /> */}
            </label>
            <div className="rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"><Send strokeWidth={0.5} size={20} className='text-black' /></div>
        </motion.div>
    )
}
