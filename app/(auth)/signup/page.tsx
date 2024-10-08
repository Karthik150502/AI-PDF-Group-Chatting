'use client'
import React from 'react'
import SignUpform from '@/components/signup/signUpform'

import {
    motion,
    useMotionTemplate,
    useMotionValue,
    animate
} from "framer-motion";
import { useEffect } from "react";
export default function page() {

    useEffect(() => {
        animate(color, COLORS, {
            ease: "easeInOut",
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror"
        })
    }, [])
    const COLORS = ["#10E4E2", "#D19016", "#8FCE00", "#FF0096"]
    const color = useMotionValue(COLORS[0]);
    const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 35%, ${color})`

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.3,
                duration: 0.3,
                ease: "easeInOut",
            }}
            className='w-screen h-screen flex flex-col items-center justify-center'>
            <motion.p
                style={{
                    backgroundImage
                }}
                className='md:text-8xl text-6xl font-extrabold bg-clip-text text-transparent'>Sign Up</motion.p>
            <SignUpform />
        </motion.div>
    )
}
