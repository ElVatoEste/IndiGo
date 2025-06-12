"use client"
import { useAuth } from "@/contexts/AuthContext"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase/clientApp"
import { useState } from "react"
import { ProfesionalProfile } from "@/types/ProfesionalProfile"
import { User, Briefcase, CheckCircle2 } from "lucide-react"

const SERVICIOS = [
  { id: "limpieza-profunda", label: "Limpieza Profunda", icon: "🧹" },
  { id: "mantenimiento", label: "Mantenimiento", icon: "🔧" },
  { id: "lavanderia", label: "Lavandería", icon: "👕" },
]

export default function ProfilePage() {
  const { user } = useAuth()
  const perfil = user?.profile as ProfesionalProfile

  // Estado local para edición instantánea
  const [descripcion, setDescripcion] = useState(perfil?.descripcionProfesional || "")
  const [tiposServicio, setTiposServicio] = useState<string[]>(perfil?.tiposServicio || [])
  const [isSaving, setIsSaving] = useState(false)

  // Actualiza Firestore cuando cambian los toggles
  const handleToggleServicio = async (id: string) => {
    setIsSaving(true)
    let actualizados: string[]
    if (tiposServicio.includes(id)) {
      actualizados = tiposServicio.filter((s) => s !== id)
    } else {
      actualizados = [...tiposServicio, id]
    }
    setTiposServicio(actualizados)
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), { tiposServicio: actualizados })
      } catch (error) {
        console.error("Error al actualizar servicios:", error)
      }
    }
    setIsSaving(false)
  }

  // Actualiza Firestore cuando cambia la descripción
  const handleDescripcion = async (nuevo: string) => {
    setDescripcion(nuevo)
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), { descripcionProfesional: nuevo })
      } catch (error) {
        console.error("Error al actualizar descripción:", error)
      }
    }
  }

  if (!perfil) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-8 sm:px-8">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-full">
              <User className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{perfil.displayName}</h1>
              <p className="text-indigo-100">{perfil.email}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">Descripción profesional</h2>
            </div>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 min-h-[120px] resize-none"
              value={descripcion}
              onChange={(e) => handleDescripcion(e.target.value)}
              placeholder="Contá a los clientes sobre vos y tu experiencia..."
            />
          </div>

          {/* Servicios */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                <h2 className="text-lg font-semibold text-gray-900">Servicios que ofrezco</h2>
              </div>
              {isSaving && (
                <div className="flex items-center space-x-2 text-sm text-indigo-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-600"></div>
                  <span>Guardando...</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICIOS.map((srv) => (
                <label
                  key={srv.id}
                  className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    tiposServicio.includes(srv.id)
                      ? "border-indigo-600 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={tiposServicio.includes(srv.id)}
                    onChange={() => handleToggleServicio(srv.id)}
                    className="sr-only"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{srv.icon}</span>
                    <span className="font-medium text-gray-700">{srv.label}</span>
                  </div>
                  {tiposServicio.includes(srv.id) && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
