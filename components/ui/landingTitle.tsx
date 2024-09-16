'use client'
import React from 'react'
import { motion } from 'framer-motion';
export default function LandingTitle() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.3,
                duration: 0.3,
                ease: "easeInOut",
            }}
            className="w-full flex flex-col items-start justify-start mb-4 px-4">
            <p className='text-4xl text-white py-4 text-clip'>Welcome, <br />Upload any document, and literally talk to it.</p>
            <p className='text-base text-white'>Add other users to a chat and together talk to the AI about the document.</p>
        </motion.div>
    )
}
