"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Crown, CreditCard, Building, ArrowLeft, Check } from "lucide-react"

export default function PaymentPage() {
    const { user, loading, updateUserPlan } = useAuth()
    const router = useRouter()

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
    }, [user, loading, router])

    const handlePayment = async () => {
        if (!selectedPaymentMethod) {
            alert("Por favor selecciona un método de pago")
            return
        }

        setProcessing(true)

        // Simular procesamiento de pago
        setTimeout(async () => {
            // Aquí integrarías con tu pasarela de pagos real
            if (user && user.profile?.userType === "estudiante") {
                try {
                    await updateUserPlan(user.uid, "premium")
                    alert("¡Pago procesado exitosamente! Tu plan premium ha sido activado.")
                    router.push("/dashboard")
                } catch (error) {
                    console.error("Error al actualizar el plan:", error)
                    alert("Pago procesado, pero hubo un error al actualizar tu plan. Por favor, contacta a soporte.")
                    setProcessing(false) // Allow retrying or showing error
                }
            } else {
                alert("Pago procesado, pero no se pudo actualizar el plan. Asegúrate de ser un usuario estudiante.")
                router.push("/dashboard") // Still redirect, but inform user
            }
        }, 3000)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-indigo-primary flex items-center justify-center">
                <div className="text-indigo-text text-xl">Cargando...</div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center text-indigo-secondary hover:text-indigo-secondary/80 mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </button>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-10 h-10 bg-indigo-secondary rounded-lg flex items-center justify-center">
                            <span className="text-indigo-text font-bold">I</span>
                        </div>
                        <span className="text-indigo-primary font-bold text-2xl">IndiGO</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Activar Plan Premium</h1>
                    <p className="text-gray-600 mt-2">Completa tu suscripción para acceder a todas las funcionalidades</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Plan Summary */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center mb-4">
                            <Crown className="h-6 w-6 text-yellow-500 mr-2" />
                            <h2 className="text-xl font-bold text-gray-900">Plan Premium</h2>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-baseline">
                                <span className="text-4xl font-bold text-indigo-primary">C$720</span>
                                <span className="text-gray-500 ml-2">/mes</span>
                            </div>
                            <p className="text-gray-600 mt-2">Facturación mensual • Cancela cuando quieras</p>
                        </div>

                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-900">Incluye:</h3>
                            {[
                                "Asesorías ilimitadas con expertos locales",
                                "Gestión de trámites gubernamentales",
                                "Recetas premium y listas de mercado",
                                "Análisis financiero en córdobas",
                                "Soporte prioritario 24/7",
                                "Descuentos en servicios de limpieza",
                                "Historial de pagos y facturación",
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                                    <span className="text-gray-700 text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 max-w-md mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900">Método de Pago</h2>

                        <div className="space-y-4">
                            {/* Opción: Tarjeta */}
                            <label
                                className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                    selectedPaymentMethod === "card"
                                        ? "border-indigo-secondary bg-indigo-50 shadow-sm"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={selectedPaymentMethod === "card"}
                                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                    className="sr-only"
                                />
                                <div className="flex items-center space-x-3">
                                    <CreditCard className="h-6 w-6 text-indigo-secondary" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Tarjeta de Crédito/Débito</p>
                                        <p className="text-xs text-gray-500">Visa, Mastercard, American Express</p>
                                    </div>
                                </div>
                            </label>

                            {/* Opción: Transferencia */}
                            <label
                                className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                    selectedPaymentMethod === "transfer"
                                        ? "border-indigo-secondary bg-indigo-50 shadow-sm"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="transfer"
                                    checked={selectedPaymentMethod === "transfer"}
                                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                                    className="sr-only"
                                />
                                <div className="flex items-center space-x-3">
                                    <Building className="h-6 w-6 text-indigo-secondary" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Transferencia Bancaria</p>
                                        <p className="text-xs text-gray-500">BAC, Banpro, Lafise</p>
                                    </div>
                                </div>
                            </label>
                        </div>

                        {/* Botón de Pago */}
                        <button
                            onClick={handlePayment}
                            disabled={!selectedPaymentMethod || processing}
                            className="w-full bg-indigo-secondary hover:bg-indigo-secondary/90 text-white py-3 rounded-md font-semibold text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? "Procesando pago..." : "Pagar C$720"}
                        </button>

                        {/* Legal */}
                        <p className="text-xs text-center text-gray-500 mt-4">
                            Al continuar, aceptas nuestros{" "}
                            <a href="#" className="text-indigo-secondary hover:underline">
                                Términos de Servicio
                            </a>{" "}
                            y{" "}
                            <a href="#" className="text-indigo-secondary hover:underline">
                                Política de Privacidad
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
