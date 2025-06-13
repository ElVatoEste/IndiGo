"use client";

import { useState } from "react";

interface OfertarModalProps {
  open: boolean;
  /** Renombrada */
  onCloseAction: () => void;
  /** Renombrada */
  onSubmitAction: (data: { precio: number; mensaje: string }) => void;
}

export default function OfertarModal({
                                       open,
                                       onCloseAction,
                                       onSubmitAction,
                                     }: OfertarModalProps) {
  const [precio, setPrecio] = useState("");
  const [mensaje, setMensaje] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
          onClick={onCloseAction}
          aria-hidden="true"
        />

        {/* Modal */}
        <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-md">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <button
              onClick={onCloseAction}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl transition-colors"
              title="Cerrar"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Enviar Oferta
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!precio) return;
                onSubmitAction({ precio: Number(precio), mensaje });
              }}
              className="flex flex-col gap-6"
            >
              <div>
                <label className="font-medium text-gray-900 mb-2 block">
                  Monto de tu oferta
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">C$</span>
                  </div>
                  <input
                    type="number"
                    className="w-full border-2 border-gray-200 rounded-lg pl-12 pr-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                    min={1}
                    placeholder="0.00"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Ingresa el monto que cobrarás por este servicio
                </p>
              </div>

              <div>
                <label className="font-medium text-gray-900 mb-2 block">
                  Mensaje para el cliente
                </label>
                <textarea
                  className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Describe los detalles de tu oferta, materiales incluidos, tiempo estimado..."
                  rows={4}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Opcional: Añade información adicional sobre tu oferta
                </p>
              </div>

              <button
                type="submit"
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!precio.trim()}
              >
                Enviar oferta
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
