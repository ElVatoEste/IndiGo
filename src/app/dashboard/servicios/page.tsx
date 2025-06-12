"use client";
import { useState } from "react";
import SolicitarServicioModal from "@/components/requests/SolicitarServicioModal";
import { useAuth } from "@/contexts/AuthContext";
import { crearSolicitudServicio } from "@/lib/firestoreSolicitudes";
import { useSolicitudesActivas } from "@/hooks/useSolicitudesActivas";
import SolicitudServicioCard from "@/components/requests/SolicitudServicioCard";

interface SolicitudData {
    tiposServicio: string[];
    descripcion: string;
    ubicacion: string;
    fecha: string;
}

export default function ServiciosPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const { user } = useAuth();
    const { solicitudes, loading } = useSolicitudesActivas(user?.uid);

    const handleSolicitar = async (data: SolicitudData) => {
        if (!user) return;
        await crearSolicitudServicio({
            user: {
                uid: user.uid,
                displayName: user.displayName || user.email || "Usuario",
                email: user.email || "",
            },
            ...data,
        });
        setModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Mis Servicios
                    </h1>
                    <p className="text-gray-600">
                        Gestiona tus solicitudes de servicio activas
                    </p>
                </div>

                {/* FAB */}
                <div className="fixed bottom-8 right-8 z-40">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-3 shadow-lg text-lg font-bold flex items-center gap-2 transition-all duration-200 hover:scale-105"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Solicitar servicio
                    </button>
                </div>

                {/* Grid */}
                <div className="mt-8">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
                            <p className="ml-3 text-gray-700">Cargando solicitudes...</p>
                        </div>
                    ) : solicitudes.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                            <div className="text-gray-500 text-6xl mb-4">📝</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No tienes solicitudes activas
                            </h3>
                            <p className="text-gray-700 mb-6">
                                Solicita un nuevo servicio para comenzar
                            </p>
                            <button
                                onClick={() => setModalOpen(true)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
                            >
                                Crear nueva solicitud
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-black">
                            {solicitudes.map((sol) => (
                                <SolicitudServicioCard
                                    key={sol.id}
                                    id={sol.id}
                                    userDisplayName={sol.userDisplayName}
                                    userEmail={sol.userEmail}
                                    tiposServicio={sol.tiposServicio || []}
                                    descripcion={sol.descripcion || ""}
                                    estado={sol.estado}
                                    fecha={sol.fecha}
                                    ubicacion={sol.ubicacion}
                                    onVerPostulaciones={
                                        sol.estado === "activo"
                                            ? () => console.log("Ver postulaciones", sol.id)
                                            : undefined
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <SolicitarServicioModal
                open={modalOpen}
                onCloseAction={() => setModalOpen(false)}
                onSubmitAction={handleSolicitar}
            />
        </div>
    );
}
