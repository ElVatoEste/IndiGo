import React from "react"

interface SolicitudCardProps {
  cliente: string
  tipo: string
  fecha: string
  precio: number
  onAccept: () => void
  onReject: () => void
}

export default function SolicitudCard({
  cliente,
  tipo,
  fecha,
  precio,
  onAccept,
  onReject,
}: SolicitudCardProps) {
  return (
    <div className="bg-white shadow p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-indigo-primary">{cliente}</h3>
      <p className="text-gray-600">Tipo: {tipo}</p>
      <p className="text-gray-600">Fecha: {fecha}</p>
      <p className="text-gray-800 font-medium mt-2">C$ {precio}</p>
      <div className="flex gap-2 mt-4">
        <button onClick={onAccept} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Aceptar</button>
        <button onClick={onReject} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Rechazar</button>
      </div>
    </div>
  )
}
