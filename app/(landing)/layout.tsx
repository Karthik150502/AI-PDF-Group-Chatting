import type { Metadata } from "next";
import AuthProvider from "../components/auth/authProvider";
import Navbar from "../components/auth/Navbarlarge/navbar";
import { Toaster } from "@/components/ui/toaster"
import Provider from "@/components/ui/provider";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <AuthProvider>
                <Provider>
                    <body className="w-screen h-screen flex p-8 relative">
                        {children}
                        <Toaster />
                    </body >
                </Provider>
            </AuthProvider>
        </html>
    )
}
