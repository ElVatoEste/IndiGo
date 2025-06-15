import { useEffect, useState } from "react"
import { collection, query, where, onSnapshot, Timestamp } from "firebase/firestore"
import { db } from "@/firebase/clientApp"

export interface SolicitudServicio {
  id: string
  userId: string
  userDisplayName: string
  userEmail: string
  telefono?: string
  tiposServicio: string[]
  descripcion: string
  ubicacion: string
  fecha: string
  estado: "activo" | "pendiente" | "cancelado" | "finalizado"
  createdAt?: Timestamp
  profesionalId?: string
  profesionalNombre?: string
  profesionalCalificacion?: number
  metodoPago?: "efectivo" | "linea"
}

export function usePendientesProfesional(profesionalId: string) {
  const [pendientes, setPendientes] = useState<SolicitudServicio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!profesionalId) {
      setPendientes([])
      setLoading(false)
      return
    }
    
    const q = query(
      collection(db, "service_requests"),
      where("profesionalId", "==", profesionalId),
      where("estado", "==", "pendiente")
    )
    
    const unsub = onSnapshot(q, (snap) => {
      setPendientes(snap.docs.map(d => ({ id: d.id, ...d.data() })) as SolicitudServicio[])
      setLoading(false)
    })
    
    return () => unsub()
  }, [profesionalId])

  return { pendientes, loading }
} 