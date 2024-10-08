import { montserrat300 } from "../fonts/montserrat";
import clsx from "clsx";
import "./styles.css"
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {




    return (
        <main
            className={clsx("relative min-h-screen overflow-hidden grid place-content-center p-4", montserrat300.className)} style={{
                backgroundImage: `url(https://wallpapercave.com/w/wp13181855.jpg)`,
                backgroundSize: "cover"
            }}>
            {children}
        </main >
    )
}
