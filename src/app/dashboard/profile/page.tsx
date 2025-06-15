"use client"
import { useAuth } from "@/contexts/AuthContext"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase/clientApp"
import { useState } from "react"
import { User, CreditCard, Mail, Save, UserCircle, Phone, MapPin } from "lucide-react"
import { toast } from "react-hot-toast"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    direccion: user?.profile?.direccion || "",
    telefono: user?.profile?.telefono || "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.displayName.trim()) {
      toast.error("El nombre no puede estar vacío")
      return false
    }
    if (!formData.telefono.trim()) {
      toast.error("El teléfono no puede estar vacío")
      return false
    }
    if (!/^\d{10}$/.test(formData.telefono.replace(/\D/g, ''))) {
      toast.error("El teléfono debe tener 10 dígitos")
      return false
    }
    if (!formData.direccion.trim()) {
      toast.error("La dirección no puede estar vacía")
      return false
    }
    return true
  }

  const handleSave = async () => {
    if (!validateForm()) return
    
    setIsSaving(true)
    try {
      await updateDoc(doc(db, "users", user!.uid), {
        displayName: formData.displayName,
        direccion: formData.direccion,
        telefono: formData.telefono
      })
      toast.success("Perfil actualizado correctamente")
    } catch (error) {
      console.error("Error al actualizar perfil:", error)
      toast.error("Error al actualizar el perfil")
    }
    setIsSaving(false)
  }

  if (!user) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 px-6 py-8 sm:px-8">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
              <p className="text-indigo-100 mt-1">Información personal</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Non-editable fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors duration-200">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <CreditCard className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-medium text-gray-900">Cédula</h3>
              </div>
              <p className="text-gray-600 ml-11">{user.profile?.cedula || "No especificada"}</p>
            </div>

            <div className="bg-gray-50/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors duration-200">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-medium text-gray-900">Email</h3>
              </div>
              <p className="text-gray-600 ml-11">{user.email}</p>
            </div>
          </div>

          {/* Editable fields */}
          <div className="space-y-6">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <UserCircle className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Tu nombre completo"
                />
              </div>
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Tu número de teléfono"
                />
              </div>
            </div>

            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Tu dirección completa"
                />
              </div>
            </div>
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
