import React from 'react'
import { motion } from 'framer-motion';




export default function CmsInputError({ message }: { message: string }) {
    return (

        <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.3,
                duration: 0.2,
                ease: "easeInOut",
            }}
            className='text-red-400 text-xs' >
            {message}
        </motion.p >
    )
}
