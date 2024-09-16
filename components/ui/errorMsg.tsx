import React from 'react'
import { motion } from 'framer-motion'
export default function ErrorMsg({ message }: { message: string }) {
    return (
        <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.3,
                duration: 0.3,
                ease: "easeInOut",
            }}
            className="text-[10px] w-full text-right mr-4 font-extralight text-white">{message}</motion.p>
    )
}
