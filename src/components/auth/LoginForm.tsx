"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import Image from "next/image";

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const { login, loginWithGoogle } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            await login(email, password)
            router.push("/dashboard")
        } catch (error: unknown) {
            if (typeof error === "object" && error !== null && "code" in error) {
                setError(getErrorMessage((error as { code: string }).code));
            } else {
                setError("Ha ocurrido un error inesperado.");
            }
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        setLoading(true)
        setError("")

        try {
            const result = await loginWithGoogle()

            if (result.needsCompletion) {
                router.push("/complete-profile")
            } else {
                router.push("/dashboard")
            }
        } catch (error: unknown) {
            if (typeof error === "object" && error !== null && "code" in error) {
                setError(getErrorMessage((error as { code: string }).code));
            } else {
                setError("Ha ocurrido un error inesperado.");
            }
        } finally {
            setLoading(false)
        }
    }

    const getErrorMessage = (errorCode: string) => {
        switch (errorCode) {
            case "auth/user-not-found":
                return "No existe una cuenta con este correo electrónico"
            case "auth/wrong-password":
                return "Contraseña incorrecta"
            case "auth/invalid-email":
                return "Correo electrónico inválido"
            case "auth/too-many-requests":
                return "Demasiados intentos fallidos. Intenta más tarde"
            default:
                return "Error al iniciar sesión. Intenta nuevamente"
        }
    }

    return (
        <div className="max-w-[500px] w-full mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                    <Image src="/isotipo.png" alt="Isotipo IndiGO" width={32} height={32} />
                    <span className="text-indigo-primary font-bold text-2xl">IndiGO</span>
                </div>
                <h2 className="text-2xl font-bold text-indigo-primary">Iniciar Sesión</h2>
                <p className="text-gray-600 mt-2">Accede a tu cuenta de IndiGO</p>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Correo Electrónico
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-secondary focus:border-transparent"
                            placeholder="tu@email.com"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Contraseña
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-secondary focus:border-transparent"
                            placeholder="Tu contraseña"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-secondary hover:bg-indigo-secondary/90 text-white py-3 px-4 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </button>
            </form>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">O continúa con</span>
                    </div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="mt-4 w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-3 px-4 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                    <Image src="/google.png" alt="Google logo" width={20} height={20} className="h-5 w-5"/>
                    <span>Continuar con Google</span>
                </button>
            </div>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                    ¿No tienes cuenta?{" "}
                    <a href="/register" className="text-indigo-secondary hover:underline font-medium">
                        Regístrate aquí
                    </a>
                </p>
            </div>
        </div>
    )
}
