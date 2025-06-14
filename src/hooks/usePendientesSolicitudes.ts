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
}

export function usePendientesSolicitudes(userId: string) {
  const [pendientes, setPendientes] = useState<SolicitudServicio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    const q = query(
      collection(db, "service_requests"),
      where("userId", "==", userId),
      where("estado", "==", "pendiente")
    )
    const unsub = onSnapshot(q, (snap) => {
      setPendientes(snap.docs.map(d => ({ id: d.id, ...d.data() })) as SolicitudServicio[])
      setLoading(false)
    })
    return () => unsub()
  }, [userId])

  return { pendientes, loading }
}
