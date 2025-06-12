"use client"

import { type ReactNode, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import DashboardNavbar from "@/components/dashboard/DashboardNavbar"
import LoadingScreen from "@/components/LoadingScreen"

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [isClient, setIsClient] = useState(false)

    const pathname = usePathname()
    const router = useRouter()
    const { user, loading, needsProfileCompletion } = useAuth()

    useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        if (!isClient || loading) return

        if (!user) {
            router.push("/login")
        } else if (needsProfileCompletion) {
            router.push("/complete-profile")
        } else if (
            user.profile?.userType === "profesional" &&
            !pathname.startsWith("/dashboard/profesional")
        ) {
            router.push("/dashboard/profesional")
        } else if (
            user.profile?.userType === "estudiante" &&
            pathname.startsWith("/dashboard/profesional")
        ) {
            router.push("/dashboard")
        }
    }, [loading, user, needsProfileCompletion, pathname, router, isClient])

    if (
        !isClient ||
        !user ||
        needsProfileCompletion ||
        (user?.profile?.userType === "profesional" && !pathname.startsWith("/dashboard/profesional")) ||
        (user?.profile?.userType === "estudiante" && pathname.startsWith("/dashboard/profesional"))
    ) {
        return <LoadingScreen />
    }

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardNavbar />
            <main className="flex-1">{children}</main>
        </div>
    )
}