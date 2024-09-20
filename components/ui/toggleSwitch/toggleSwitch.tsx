import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import clsx from 'clsx'
/**
 * This is an example of layout animations in Framer Motion 2.
 *
 * It's as simple as adding a `layout` prop to the `motion.div`. When
 * the flexbox changes, the handle smoothly animates between layouts.
 *
 * Try adding whileHover={{ scale: 1.2 }} to the handle - the layout
 * animation is now fully compatible with user-set transforms.
 */

export default function ToggleSwitch() {
    const [isOn, setIsOn] = useState(false);
    const toggleSwitch = () => setIsOn(!isOn);

    

    return (
        <div className={clsx("toggle-switch w-[45px] h-[26px] flex rounded-full p-[3px] cursor-pointer  transition-all opacity-30 hover:opacity-100 duration-300", isOn ? "justify-end bg-green-400" : "justify-start bg-red-500")} onClick={toggleSwitch}>
            <motion.div className="w-[20px] h-[20px] bg-white rounded-full" layout transition={spring} />
        </div>
    );
}

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};
