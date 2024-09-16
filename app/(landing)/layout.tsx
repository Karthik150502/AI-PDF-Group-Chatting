import type { Metadata } from "next";
import AuthProvider from "../components/auth/authProvider";
import Navbar from "../components/auth/Navbarlarge/navbar";
import { Toaster } from "@/components/ui/toaster"
import Provider from "@/components/ui/provider";
import { montserrat300 } from "../fonts/montserrat";
import clsx from "clsx";




export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <AuthProvider>
                <Provider>
                    <body className={clsx("min-h-screen flex relative overflow-hidden ", montserrat300.className)}>
                        {children}
                        <Toaster />
                    </body >
                </Provider>
            </AuthProvider>
        </html>
    )
}
