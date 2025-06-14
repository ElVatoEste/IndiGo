import { deleteDoc, doc } from "firebase/firestore"
import { db } from "@/firebase/clientApp"

/**
 * @param solicitudId - ID de la solicitud (service_request)
 * @param ofertaId - ID de la oferta a eliminar
 */
export async function eliminarOfertaDeSolicitud(solicitudId: string, ofertaId: string) {
  const ref = doc(db, "service_requests", solicitudId, "ofertas", ofertaId)
  await deleteDoc(ref)
}
