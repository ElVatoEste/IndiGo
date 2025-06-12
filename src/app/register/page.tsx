"use client"

import { Suspense } from "react"
import RegisterForm from "@/components/auth/RegisterForm"
import LoadingScreen from "@/components/LoadingScreen";

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-indigo-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Suspense fallback={ <LoadingScreen />}>
                <RegisterForm />
            </Suspense>
        </div>
    )
}
