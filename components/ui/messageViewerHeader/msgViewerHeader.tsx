import React from 'react'
import ToggleSwitch from '../toggleSwitch/toggleSwitch'
import MsgViewerOptions from '../messsageViewerOptions/MsgViewerOptions'
export default function MsgViewerHeader() {
    return (
        <div className="w-full h-hull flex items-center justify-between px-4 py-2">
            <ToggleSwitch />
            <MsgViewerOptions />
        </div>
    )
}
