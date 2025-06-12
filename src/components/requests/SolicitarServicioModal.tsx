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
  { id: "limpieza-profunda", label: "Limpieza Profunda" },
  { id: "mantenimiento",    label: "Mantenimiento"    },
  { id: "lavanderia",       label: "Lavandería"       },
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
          <button
              onClick={onCloseAction}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
              title="Cerrar"
          >
            ×
          </button>
          <h2 className="text-xl font-bold text-indigo-primary mb-6">
            Solicitar nuevo servicio
          </h2>
          <form
              onSubmit={(e) => {
                e.preventDefault();
                if (
                    !ubicacion.trim() ||
                    !fecha.trim() ||
                    tiposSeleccionados.length === 0
                )
                  return;
                onSubmitAction({
                  tiposServicio: tiposSeleccionados,
                  descripcion,
                  ubicacion,
                  fecha,
                });
              }}
              className="flex flex-col gap-4"
          >
            {/* Tipo */}
            <div>
              <label className="font-medium text-gray-700 mb-1 block">
                Tipo de servicio
              </label>
              <div className="flex flex-col gap-1">
                {tipos.map((tipo) => (
                    <label
                        key={tipo.id}
                        className="text-black flex items-center gap-2 cursor-pointer"
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
                          className="accent-indigo-primary"
                      />
                      <span>{tipo.label}</span>
                    </label>
                ))}
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="font-medium text-gray-700 mb-1 block">
                Descripción (opcional)
              </label>
              <input
                  className="w-full border rounded-md px-3 py-2"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Detalles adicionales"
              />
            </div>

            {/* Ubicación */}
            <div>
              <label className="font-medium text-gray-700 mb-1 block">
                Ubicación
              </label>
              <input
                  className="w-full border rounded-md px-3 py-2"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  placeholder="Ej: Villa Fontana, Managua"
                  required
              />
            </div>

            {/* Fecha */}
            <div>
              <label className="font-medium text-gray-700 mb-1 block">
                Fecha
              </label>
              <input
                  className="w-full border rounded-md px-3 py-2"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
              />
            </div>

            <button
                type="submit"
                className="mt-2 bg-indigo-primary hover:bg-indigo-secondary text-white px-6 py-2 rounded-md font-medium transition"
            >
              Solicitar servicio
            </button>
          </form>
        </div>
      </div>
  );
}
