'use client'
import { montserrat300 } from "../fonts/montserrat";
import clsx from "clsx";
import "./styles.css"
import Image from "next/image";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {




    return (
        <html lang="en">
            <body
                className={clsx("relative min-h-screen overflow-hidden grid place-content-center p-4", montserrat300.className)} style={{
                    backgroundImage: `url(https://wallpapercave.com/w/wp13181855.jpg)`,
                    backgroundSize: "cover"
                }}>
                {/* <Image src="https://wallpapercave.com/w/wp13181855.jpg" alt="space background" height={720} width={1080} className="-z-10 absolute w-screen h-screen"></Image> */}
                {children}
            </body >
        </html >
    )
}
