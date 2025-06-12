"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import CompleteProfileForm from "@/components/auth/CompleteProfileForm"
import LoadingScreen from "@/components/LoadingScreen";

export default function CompleteProfilePage() {
    const { user, loading, needsProfileCompletion } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/login")
            } else if (!needsProfileCompletion) {
                router.push("/dashboard")
            }
        }
    }, [user, loading, needsProfileCompletion, router])

    if (loading) {
        return <LoadingScreen />
    }

    if (!user || !needsProfileCompletion) {
        return null
    }

    return (
        <div className="min-h-screen bg-indigo-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <CompleteProfileForm />
        </div>
    )
}
