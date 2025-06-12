"use client"

import { usePathname, useRouter } from "next/navigation"
import React, { ReactNode, useEffect } from "react"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()

    const { user, loading, needsProfileCompletion, logout } = useAuth()

    useEffect(() => {
        if (loading) return

        if (!user) {
            router.push("/login")
        } else if (needsProfileCompletion) {
            router.push("/complete-profile")
        } else if (
            user.profile?.userType === "profesional" &&
            pathname !== "/dashboard/profesional"
        ) {
            router.push("/dashboard/profesional")
        }
    }, [loading, user, needsProfileCompletion, pathname, router])

    if (
        !user ||
        needsProfileCompletion ||
        (user?.profile?.userType === "profesional" && pathname !== "/dashboard/profesional")
    ) {
        return null // ⛔ No muestra nada durante la redirección
    }

    const showNavbar =
        pathname.startsWith("/dashboard") &&
        !pathname.startsWith("/dashboard/profesional")

    return (
        <div className="min-h-screen">
            {showNavbar && (
                <nav className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <Image src="/isotipo.png" alt="Isotipo IndiGO" width={32} height={32} />
                                <span className="text-indigo-primary font-bold text-xl">IndiGO</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Hola, {user.profile?.displayName}</span>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
            <main>{children}</main>
        </div>
    )
}
