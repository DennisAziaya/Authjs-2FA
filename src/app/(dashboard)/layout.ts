import type { Metadata } from "next";
import {auth} from "@/auth";
import {redirect} from "next/navigation";


export const metadata: Metadata = {
    title: "Dashboard",
    description: "Generated by create next app",
};

export default async function DashboardRootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {


    const session = await auth()

    if (!session?.user?.id) {
        redirect("/login")
    }

    return children


}
