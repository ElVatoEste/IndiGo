"use client"
import { useEffect, useState } from "react"
import { User, Calendar, MapPin, Star, Phone, CreditCard } from "lucide-react"
import { getDoc, doc, updateDoc, increment } from "firebase/firestore"
import { db } from "@/firebase/clientApp"

interface Profesional {
  calificacionPromedio?: number
  trabajosRealizados?: number
  telefono?: string
}

interface Solicitud {
  id: string
  userId: string
  userDisplayName: string
  userEmail: string
  metodoPago?: string
  tiposServicio: string[]
  descripcion: string
  ubicacion: string
  fecha: string
  estado: "activo" | "pendiente" | "cancelado" | "finalizado"
  profesionalId?: string
  profesionalNombre?: string
}

interface SolicitudPendienteCardProps {
  solicitud: Solicitud
  onActualizar: () => void
}

export default function SolicitudPendienteCard({ solicitud, onActualizar }: SolicitudPendienteCardProps) {
  const [profesional, setProfesional] = useState<Profesional | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [calificacion, setCalificacion] = useState(5)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchProf() {
      if (!solicitud.profesionalId) return
      const profSnap = await getDoc(doc(db, "users", solicitud.profesionalId))
      if (profSnap.exists()) setProfesional(profSnap.data() as Profesional)
    }
    fetchProf()
  }, [solicitud.profesionalId])

  const renderStars = (score = 0) => {
    const rounded = Math.round(score)
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rounded ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
          />
        ))}
        <span className="ml-2 text-sm text-gray-500">{score.toFixed(1)}</span>
      </div>
    )
  }

  const handleCancelar = async () => {
    setLoading(true)
    await updateDoc(doc(db, "service_requests", solicitud.id), { estado: "cancelado" })
    setLoading(false)
    onActualizar()
  }

  const handleFinalizar = () => setShowModal(true)

  const handleGuardarCalificacion = async () => {
    setLoading(true)
    if (!solicitud.profesionalId) return
    const ref = doc(db, "users", solicitud.profesionalId)
    const profSnap = await getDoc(ref)

    if (profSnap.exists()) {
      const prof = profSnap.data()
      const trabajos = prof.trabajosRealizados || 0
      const calificacionActual = prof.calificacionPromedio || 0
      const nuevaCalificacion = ((calificacionActual * trabajos) + calificacion) / (trabajos + 1)

      await updateDoc(ref, {
        calificacionPromedio: nuevaCalificacion,
        trabajosRealizados: increment(1),
      })
    }

    await updateDoc(doc(db, "service_requests", solicitud.id), { estado: "finalizado" })
    setLoading(false)
    setShowModal(false)
    onActualizar()
  }

  return (
    <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6 mb-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-full">
            <User className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 text-base">
              {solicitud.profesionalNombre}
            </h3>
            <p className="text-xs text-gray-500">Profesional asignado</p>
          </div>
        </div>
        <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
          Pendiente
        </span>
      </div>

      <div className="text-sm text-gray-600">
        <strong className="block font-medium mb-1">Servicios:</strong>
        <div className="flex flex-wrap gap-2">
          {solicitud.tiposServicio.map((tipo: string, i: number) => (
            <span
              key={i}
              className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium capitalize"
            >
              {tipo.replace("-", " ")}
            </span>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <strong className="block font-medium mb-1">Descripción:</strong>
        <p className="bg-gray-50 rounded-lg p-3">{solicitud.descripcion}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-2">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {solicitud.ubicacion}
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(solicitud.fecha).toLocaleDateString()}
        </div>
        {profesional?.telefono && (
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            {profesional.telefono}
          </div>
        )}
        {solicitud.metodoPago && (
          <div className="flex items-center gap-1">
            <CreditCard className="w-4 h-4" />
            {solicitud.metodoPago}
          </div>
        )}
        {profesional && renderStars(profesional.calificacionPromedio)}
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleCancelar}
          disabled={loading}
          className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-200 transition"
        >
          Cancelar
        </button>
        <button
          onClick={handleFinalizar}
          disabled={loading}
          className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-200 transition"
        >
          Finalizar y calificar
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[360px] max-w-full space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Califica al profesional</h2>
            <div className="flex justify-center">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  onClick={() => setCalificacion(n)}
                  className={`w-8 h-8 cursor-pointer ${
                    n <= calificacion ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded py-2 text-sm font-medium transition"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardarCalificacion}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded py-2 text-sm font-medium transition"
                disabled={loading}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
