"use client";
import { useState } from "react";
import PostulacionesModal from "@/components/requests/PostulacionesModal";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/clientApp";
// import { useMisSolicitudes } from "@/hooks/useMisSolicitudes";

export default function MisSolicitudesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [solicitudId, setSolicitudId] = useState<string | null>(null);

  // Ejemplo de datos estáticos; reemplazar por tu hook:
  const solicitudes = [
    { id: "sol1", titulo: "Solicitud A" },
    { id: "sol2", titulo: "Solicitud B" },
  ];
  // const { solicitudes } = useMisSolicitudes();

  const handleAceptarOferta = async (
      ofertaId: string,
      profesionalId: string,
      nombreProfesional: string
  ) => {
    if (!solicitudId) return;
    await updateDoc(doc(db, "service_requests", solicitudId), {
      estado: "pendiente",
      profesionalId,
      profesionalNombre: nombreProfesional,
    });
    setModalOpen(false);
    setSolicitudId(null);
    // opcional: refrescar lista, notificar, etc.
  };

  return (
      <div className="p-8 space-y-6">
        <h1 className="text-2xl font-bold">Mis Solicitudes</h1>

        <div className="grid gap-4">
          {solicitudes.map((sol) => (
              <div
                  key={sol.id}
                  className="p-4 bg-white rounded shadow flex justify-between items-center"
              >
                {/* Título en negro */}
                <span className="text-black font-semibold">{sol.titulo}</span>

                <button
                    onClick={() => {
                      setSolicitudId(sol.id);
                      setModalOpen(true);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white"
                >
                  Ver postulaciones
                </button>
              </div>
          ))}
        </div>

        {solicitudId && (
            <PostulacionesModal
                open={modalOpen}
                solicitudId={solicitudId}
                onCloseAction={() => setModalOpen(false)}
                onAceptarAction={handleAceptarOferta}
            />
        )}
      </div>
  );
}
