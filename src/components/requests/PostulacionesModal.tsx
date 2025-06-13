"use client";
import { useOfertasConPerfil } from "@/hooks/useOfertasConPerfil";
import { useState } from "react";

interface PostulacionesModalProps {
  open: boolean;
  /** Renombrada */
  onCloseAction: () => void;
  solicitudId: string;
  /** Renombrada */
  onAceptarAction: (
      ofertaId: string,
      profesionalId: string,
      nombreProfesional: string
  ) => void;
}

export default function PostulacionesModal({
                                             open,
                                             onCloseAction,
                                             solicitudId,
                                             onAceptarAction,
                                           }: PostulacionesModalProps) {
  const { ofertas, loading } = useOfertasConPerfil(solicitudId);
  const [aceptando, setAceptando] = useState<string | null>(null);

  if (!open) return null;

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-lg h-[90vh] overflow-y-auto relative">
          <button
              onClick={onCloseAction}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
              title="Cerrar"
          >
            ×
          </button>
          <h2 className="text-xl font-bold text-indigo-primary mb-4">
            Postulaciones recibidas
          </h2>

          {loading ? (
              <div className="text-gray-600 text-center py-12">
                Cargando ofertas...
              </div>
          ) : ofertas.length === 0 ? (
              <div className="text-gray-400 text-center py-12">
                No hay postulaciones para esta solicitud.
              </div>
          ) : (
              <div className="space-y-4">
                {ofertas.map((oferta) => (
                    <div
                        key={oferta.id}
                        className="border rounded-lg p-4 flex flex-col gap-2 bg-gray-50 shadow"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold text-indigo-900">
                            {oferta.profesionalNombre}
                          </div>
                          <div className="text-sm text-gray-500">
                            Calificación:{" "}
                            {oferta.promedioCalificacion !== null
                                ? oferta.promedioCalificacion?.toFixed(1)
                                : "Sin calificación"}
                          </div>
                        </div>
                        <div className="font-bold text-lg text-indigo-700">
                          C${oferta.precio}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-700 mb-1">Mensaje:</div>
                        <div className="text-gray-900">
                          {oferta.mensaje || (
                              <span className="italic text-gray-400">Sin mensaje</span>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-gray-400">
                        {oferta.createdAt?.toDate
                            ? new Date(oferta.createdAt.toDate()).toLocaleString()
                            : ""}
                      </div>

                      <button
                          onClick={() => {
                            setAceptando(oferta.id);
                            onAceptarAction(
                                oferta.id,
                                oferta.profesionalId,
                                oferta.profesionalNombre
                            );
                          }}
                          disabled={!!aceptando}
                          className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
                      >
                        {aceptando === oferta.id ? "Aceptando..." : "Aceptar oferta"}
                      </button>
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>
  );
}
