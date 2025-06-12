"use client"

import { Suspense } from "react"
import RegisterForm from "@/components/auth/RegisterForm"

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-indigo-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div className="text-white">Cargando formulario…</div>}>
                <RegisterForm />
            </Suspense>
        </div>
    )
}
