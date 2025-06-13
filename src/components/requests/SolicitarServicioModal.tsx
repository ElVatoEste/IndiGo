"use client";
import { useState } from "react";

interface SolicitarServicioModalProps {
  open: boolean;
  onCloseAction: () => void;
  onSubmitAction: (data: {
    tiposServicio: string[];
    descripcion: string;
    ubicacion: string;
    fecha: string;
  }) => void;
}

const tipos = [
  { 
    id: "limpieza-profunda", 
    label: "Limpieza Profunda", 
    icon: "🧹",
    description: "Limpieza completa de tu hogar"
  },
  { 
    id: "mantenimiento", 
    label: "Mantenimiento", 
    icon: "🔧",
    description: "Reparaciones y ajustes generales"
  },
  { 
    id: "lavanderia", 
    label: "Lavandería", 
    icon: "👕",
    description: "Lavado y planchado de ropa"
  },
];

export default function SolicitarServicioModal({
  open,
  onCloseAction,
  onSubmitAction,
}: SolicitarServicioModalProps) {
  const [tiposSeleccionados, setTiposSeleccionados] = useState<string[]>([]);
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [fecha, setFecha] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 text-center">
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onCloseAction} />

        {/* Modal */}
        <div className="inline-block w-full max-w-lg p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-xl relative">
          <button
            onClick={onCloseAction}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl transition-colors"
            title="Cerrar"
          >
            ×
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Solicitar nuevo servicio
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!ubicacion.trim() || !fecha.trim() || tiposSeleccionados.length === 0)
                return;
              onSubmitAction({
                tiposServicio: tiposSeleccionados,
                descripcion,
                ubicacion,
                fecha,
              });
            }}
            className="flex flex-col gap-6"
          >
            {/* Tipo */}
            <div>
              <label className="font-medium text-gray-900 mb-3 block">
                Tipo de servicio
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {tipos.map((tipo) => (
                  <label
                    key={tipo.id}
                    className={`group relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      tiposSeleccionados.includes(tipo.id)
                        ? "border-indigo-600 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={tiposSeleccionados.includes(tipo.id)}
                      onChange={() =>
                        setTiposSeleccionados((sel) =>
                          sel.includes(tipo.id)
                            ? sel.filter((s) => s !== tipo.id)
                            : [...sel, tipo.id]
                        )
                      }
                      className="hidden"
                    />
                    <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-200">
                      {tipo.icon}
                    </div>
                    <span className="font-semibold text-gray-900 text-center mb-1">
                      {tipo.label}
                    </span>
                    <span className="text-sm text-gray-500 text-center">
                      {tipo.description}
                    </span>
                    {tiposSeleccionados.includes(tipo.id) && (
                      <div className="absolute top-2 right-2 text-indigo-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="font-medium text-gray-900 mb-2 block">
                Descripción (opcional)
              </label>
              <textarea
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Detalles adicionales del servicio que necesitas..."
                rows={3}
              />
            </div>

            {/* Ubicación */}
            <div>
              <label className="font-medium text-gray-900 mb-2 block">
                Ubicación
              </label>
              <input
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                placeholder="Ej: Villa Fontana, Managua"
                required
              />
            </div>

            {/* Fecha */}
            <div>
              <label className="font-medium text-gray-900 mb-2 block">
                Fecha
              </label>
              <input
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!ubicacion.trim() || !fecha.trim() || tiposSeleccionados.length === 0}
            >
              Solicitar servicio
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
