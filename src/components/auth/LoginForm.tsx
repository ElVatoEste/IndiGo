"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

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
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-10 h-10 bg-indigo-secondary rounded-lg flex items-center justify-center">
                        <span className="text-indigo-text font-bold">I</span>
                    </div>
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
                    className="mt-4 w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Continuar con Google
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
