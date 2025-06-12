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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
          <button
              onClick={onCloseAction}
              className="absolute top-3 right-3 text-gray-400 text-xl"
          >
            ×
          </button>
          <h2 className="text-lg font-bold text-indigo-primary mb-4">
            Enviar Oferta
          </h2>
          <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!precio) return;
                onSubmitAction({ precio: Number(precio), mensaje });
              }}
              className="flex flex-col gap-4"
          >
            <div>
              <label className="font-medium mb-1 block text-black">
                Monto de tu oferta (C$)
              </label>
              <input
                  type="number"
                  className="w-full border rounded-md px-3 py-2"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  required
                  min={1}
              />
            </div>
            <div>
              <label className="font-medium mb-1 block text-black">
                Mensaje opcional
              </label>
              <textarea
                  className="w-full border rounded-md px-3 py-2"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Ejemplo: Incluye materiales..."
              />
            </div>
            <button
                type="submit"
                className="mt-2 bg-indigo-primary hover:bg-indigo-secondary text-white px-6 py-2 rounded-md font-medium"
            >
              Enviar oferta
            </button>
          </form>
        </div>
      </div>
  );
}
