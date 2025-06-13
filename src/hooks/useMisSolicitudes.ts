// hooks/useMisSolicitudes.ts
import { useEffect, useState } from "react"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase/clientApp"

export interface SolicitudServicio {
  id: string
  tiposServicio: string[]
  descripcion: string
  ubicacion: string
  fecha: string
  estado: string
}

export function useMisSolicitudes(uid: string) {
  const [solicitudes, setSolicitudes] = useState<SolicitudServicio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!uid) return
    const q = query(
      collection(db, "service_requests"),
      where("userId", "==", uid)
    )
    const unsub = onSnapshot(q, snap => {
      setSolicitudes(
        snap.docs.map(d => ({
          id: d.id,
          ...(d.data() as Omit<SolicitudServicio, "id">),
        }))
      )
      setLoading(false)
    })
    return () => unsub()
  }, [uid])

  return { solicitudes, loading }
}
