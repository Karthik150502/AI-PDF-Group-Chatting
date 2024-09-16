import React from 'react'
import "./styles.css"
export default function Loading({ status }: { status?: string }) {
    return (

        <div className="flex flex-col item-center justify-center w-full gap-y-4">
            <div className="loading-anim-con">
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            {
                status && <div className="progress-status w-full">
                    <p className="text-sm text-black text-center">{status}</p>
                </div>
            }

        </div>
    )
}
