import { useState } from "react"
import { eliminarOfertaDeSolicitud } from "@/lib/ofertas"

export function useEliminarOferta() {
  const [loadingElimination, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const eliminar = async (solicitudId: string, ofertaId: string) => {
    setLoading(true)
    setError(null)
    try {
      await eliminarOfertaDeSolicitud(solicitudId, ofertaId)
    } catch (e: unknown) {
      if (e && typeof e === "object" && "message" in e) {
        setError((e as { message?: string }).message || "Error eliminando la oferta")
      } else {
        setError("Error eliminando la oferta")
      }
    } finally {
      setLoading(false)
    }
  }

  return { eliminar, loadingElimination, error }
}
