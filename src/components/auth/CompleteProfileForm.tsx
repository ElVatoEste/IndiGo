"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import type { UserType } from "@/types/BaseUserProfile"
import { User, Phone, MapPin, Calendar, Users } from "lucide-react"

export default function CompleteProfileForm() {
    const [formData, setFormData] = useState({
        cedula: "",
        telefono: "",
        direccion: "",
        nacionalidad: "Nicaragüense",
        edad: "",
        genero: "" as "masculino" | "femenino" | "otro" | "",
        userType: "" as UserType | "",
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const { user, completeProfile } = useAuth()
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        if (!formData.userType) {
            setError("Debes seleccionar un tipo de cuenta")
            setLoading(false)
            return
        }

        try {
            await completeProfile({
                cedula: formData.cedula,
                telefono: formData.telefono,
                direccion: formData.direccion,
                nacionalidad: formData.nacionalidad,
                edad: Number.parseInt(formData.edad),
                genero: formData.genero as "masculino" | "femenino" | "otro",
                userType: formData.userType as UserType,
            })

            router.push("/dashboard")
        } catch (error: unknown) {
            if (
                typeof error === "object" &&
                error !== null &&
                "message" in error
            ) {
                setError((error as { message: string }).message);
            } else {
                setError("Error al completar el perfil. Intenta nuevamente");
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                    w-full
                    <span className="text-indigo-primary font-bold text-2xl">IndiGO</span>
                </div>
                <h2 className="text-2xl font-bold text-indigo-primary">Completa tu Perfil</h2>
                <p className="text-gray-600 mt-2">
                    Hola {user?.displayName || user?.email}, necesitamos algunos datos adicionales para completar tu registro
                </p>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información obtenida de Google */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-green-800 mb-2">Información obtenida de Google:</h3>
                    <div className="text-sm text-green-700 space-y-1">
                        <p>
                            <strong>Nombre:</strong> {user?.displayName || "No disponible"}
                        </p>
                        <p>
                            <strong>Email:</strong> {user?.email}
                        </p>
                    </div>
                </div>

                {/* Tipo de cuenta */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de cuenta *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label
                            className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                formData.userType === "estudiante"
                                    ? "border-indigo-secondary bg-indigo-50"
                                    : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            <input
                                type="radio"
                                name="userType"
                                value="estudiante"
                                checked={formData.userType === "estudiante"}
                                onChange={handleChange}
                                className="sr-only"
                            />
                            <div className="flex items-center">
                                <Users className="h-6 w-6 text-indigo-secondary mr-3" />
                                <div>
                                    <div className="font-medium text-gray-900">Estudiante</div>
                                    <div className="text-sm text-gray-500">Busco servicios para mi vida independiente</div>
                                </div>
                            </div>
                        </label>

                        <label
                            className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                                formData.userType === "profesional"
                                    ? "border-indigo-secondary bg-indigo-50"
                                    : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            <input
                                type="radio"
                                name="userType"
                                value="profesional"
                                checked={formData.userType === "profesional"}
                                onChange={handleChange}
                                className="sr-only"
                            />
                            <div className="flex items-center">
                                <User className="h-6 w-6 text-indigo-secondary mr-3" />
                                <div>
                                    <div className="font-medium text-gray-900">Profesional de Limpieza</div>
                                    <div className="text-sm text-gray-500">Ofrezco servicios de limpieza</div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Información personal adicional */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="cedula" className="block text-sm font-medium text-gray-700 mb-2">
                            Cédula *
                        </label>
                        <input
                            id="cedula"
                            name="cedula"
                            type="text"
                            value={formData.cedula}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-secondary focus:border-transparent"
                            placeholder="000-000000-0000X"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                            Teléfono *
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                id="telefono"
                                name="telefono"
                                type="tel"
                                value={formData.telefono}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-secondary focus:border-transparent"
                                placeholder="+505 8888 9999"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección *
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            id="direccion"
                            name="direccion"
                            type="text"
                            value={formData.direccion}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-secondary focus:border-transparent"
                            placeholder="Tu dirección completa"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="nacionalidad" className="block text-sm font-medium text-gray-700 mb-2">
                            Nacionalidad *
                        </label>
                        <select
                            id="nacionalidad"
                            name="nacionalidad"
                            value={formData.nacionalidad}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-secondary focus:border-transparent"
                            required
                        >
                            <option value="Nicaragüense">Nicaragüense</option>
                            <option value="Costarricense">Costarricense</option>
                            <option value="Hondureña">Hondureña</option>
                            <option value="Guatemalteca">Guatemalteca</option>
                            <option value="Salvadoreña">Salvadoreña</option>
                            <option value="Otra">Otra</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="edad" className="block text-sm font-medium text-gray-700 mb-2">
                            Edad *
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                id="edad"
                                name="edad"
                                type="number"
                                min="16"
                                max="100"
                                value={formData.edad}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-secondary focus:border-transparent"
                                placeholder="25"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-2">
                            Género *
                        </label>
                        <select
                            id="genero"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-secondary focus:border-transparent"
                            required
                        >
                            <option value="">Seleccionar</option>
                            <option value="masculino">Masculino</option>
                            <option value="femenino">Femenino</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-secondary hover:bg-indigo-secondary/90 text-white py-3 px-4 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Completando perfil..." : "Completar Perfil"}
                </button>
            </form>
        </div>
    )
}
