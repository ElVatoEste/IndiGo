"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SolicitudServicioCard from "@/components/requests/SolicitudServicioCard";
import OfertarModal from "@/components/requests/OfertarModal";
import { crearOfertaSolicitud } from "@/lib/firestoreOfertas";
import { useAuth } from "@/contexts/AuthContext";
import { useOfertasSolicitudes } from "@/hooks/useOfertasSolicitudes";
import { ProfesionalProfile } from "@/types/ProfesionalProfile";

export default function OfertasPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Lista de servicios que ofrece el profesional
  const tiposServicio = useMemo(
      () => (user?.profile as ProfesionalProfile)?.tiposServicio ?? [],
      [user]
  );

  // Estado para forzar configuración de perfil si no hay servicios
  const [needsConfig, setNeedsConfig] = useState(false);

  useEffect(() => {
    if (user && tiposServicio.length === 0) {
      setNeedsConfig(true);
    }
  }, [user, tiposServicio]);

  const serviciosOfrecidos = tiposServicio; // ya memoizado

  const { solicitudes, loading } = useOfertasSolicitudes(
      serviciosOfrecidos,
      user
  );

  const [ofertaOpen, setOfertaOpen] = useState(false);
  const [selectedSolicitudId, setSelectedSolicitudId] =
      useState<string | null>(null);
  const [rechazadas, setRechazadas] = useState<string[]>([]);

  const handleEnviarOferta = async (data: {
    precio: number;
    mensaje: string;
  }) => {
    if (!selectedSolicitudId || !user) return;
    await crearOfertaSolicitud({
      solicitudId: selectedSolicitudId,
      profesional: {
        uid: user.uid,
        nombre: user.displayName || "Usuario",
      },
      precio: data.precio,
      mensaje: data.mensaje,
    });
    setOfertaOpen(false);
    setSelectedSolicitudId(null);
  };

  // Si necesita configurar perfil, mostramos modal especial
  if (needsConfig) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4 text-black">
              Perfil incompleto
            </h2>
            <p className="mb-6 text-black">
              Debes configurar tus servicios ofrecidos antes de ver solicitudes.
            </p>
            <button
                onClick={() => router.push("/dashboard/profesional/profile")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium"
            >
              Configurar mi perfil
            </button>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Ofertas de Servicios
            </h1>
            <p className="text-gray-600">
              Solicitudes que coinciden con tus servicios ofrecidos
            </p>
          </div>

          {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent" />
                <p className="ml-3 text-gray-700">Cargando solicitudes...</p>
              </div>
          ) : solicitudes.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <div className="text-gray-500 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hay solicitudes disponibles
                </h3>
                <p className="text-gray-700">
                  No hay servicios que coincidan con tus preferencias en este
                  momento.
                </p>
              </div>
          ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-black">
                {solicitudes
                    .filter((sol) => !rechazadas.includes(sol.id))
                    .map((sol) => (
                        <SolicitudServicioCard
                            key={sol.id}
                            id={sol.id}
                            userDisplayName={sol.userDisplayName}
                            userEmail={sol.userEmail}
                            tiposServicio={sol.tiposServicio}
                            descripcion={sol.descripcion}
                            ubicacion={sol.ubicacion}
                            fecha={sol.fecha}
                            estado={sol.estado}
                        >
                          <button
                              onClick={() =>
                                  setRechazadas((r) => [...r, sol.id])
                              }
                              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                          >
                            Rechazar
                          </button>
                          <button
                              onClick={() => {
                                setSelectedSolicitudId(sol.id);
                                setOfertaOpen(true);
                              }}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
                          >
                            Enviar Oferta
                          </button>
                        </SolicitudServicioCard>
                    ))}
              </div>
          )}
        </div>

        <OfertarModal
            open={ofertaOpen}
            onCloseAction={() => setOfertaOpen(false)}
            onSubmitAction={handleEnviarOferta}
        />
      </div>
  );
}
