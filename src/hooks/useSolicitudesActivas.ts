"use client"
import { useEffect, useState } from "react"
import { collection, query, where, onSnapshot, orderBy, Timestamp } from "firebase/firestore"
import { db } from "@/firebase/clientApp"

export interface SolicitudServicio {
  id: string
  userId: string
  userDisplayName: string
  userEmail: string
  tiposServicio: string[]
  descripcion: string
  ubicacion: string
  fecha: string
  estado: string
  createdAt?: Timestamp
  profesionalId?: string
  profesionalNombre?: string
  profesionalCalificacion?: number
}

export function useSolicitudesActivas(userId: string | undefined) {
  const [solicitudes, setSolicitudes] = useState<SolicitudServicio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    const q = query(
      collection(db, "service_requests"),
      where("userId", "==", userId),
      where("estado", "==", "activo"),
      orderBy("createdAt", "desc")
    )

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as SolicitudServicio[]
      setSolicitudes(data)
      setLoading(false)
    })

    return () => unsub()
  }, [userId])

  return { solicitudes, loading }
}
