"use client"

import { type ReactNode, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()

    const { user, loading, needsProfileCompletion } = useAuth()

    useEffect(() => {
        if (loading) return

        if (!user) {
            router.push("/login")
        } else if (needsProfileCompletion) {
            router.push("/complete-profile")
        } else if (user.profile?.userType === "profesional" && pathname !== "/dashboard/profesional") {
            router.push("/dashboard/profesional")
        } else if (user.profile?.userType === "estudiante" && pathname === "/dashboard/profesional") {
            router.push("/dashboard") // Redirect professional dashboard if user is student
        }
    }, [loading, user, needsProfileCompletion, pathname, router])

    if (
        !user ||
        needsProfileCompletion ||
        (user?.profile?.userType === "profesional" && pathname !== "/dashboard/profesional") ||
        (user?.profile?.userType === "estudiante" && pathname === "/dashboard/profesional")
    ) {
        return (
            <div className="min-h-screen bg-indigo-primary flex items-center justify-center">
                <div className="text-indigo-text text-xl">Cargando...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <DashboardNavbar /> {/* Use the new DashboardNavbar */}
            <main className="flex-1">{children}</main>
        </div>
    )
}
