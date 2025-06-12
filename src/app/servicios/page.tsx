"use client"

import { useState } from "react"
import { Clock, Star, MapPin, Search, Video, Users, Sparkles, CreditCard, Percent } from "lucide-react"
import {useRouter} from "next/navigation";
import {services} from "@/data/Service";

export default function ServiciosPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [searchTerm, setSearchTerm] = useState("")

    const router = useRouter();

    const filteredServices = services.filter((service) => {
        const matchesCategory = selectedCategory === "all" || service.category === selectedCategory
        const matchesSearch =
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const categories = [
        { id: "all", name: "Todos", icon: "🏠", color: "bg-gray-100" },
        { id: "asesoria-virtual", name: "Asesorías Virtuales", icon: "💻", color: "bg-blue-100" },
        { id: "limpieza-profunda", name: "Limpieza Profunda", icon: "✨", color: "bg-purple-100" },
        { id: "mantenimiento", name: "Mantenimiento", icon: "🔧", color: "bg-green-100" },
        { id: "lavanderia", name: "Lavandería", icon: "👕", color: "bg-pink-100" },
    ]

    const getServiceIcon = (category: string, subcategory?: string) => {
        if (category === "asesoria-virtual") {
            if (subcategory === "finanzas") return "💰"
            if (subcategory === "cocina") return "👨‍🍳"
            if (subcategory === "tramites") return "📋"
            return "💻"
        }
        if (category === "limpieza-profunda") return "✨"
        if (category === "mantenimiento") return "🔧"
        if (category === "lavanderia") return "👕"
        return "🏠"
    }

    const isCleaningService = (category: string) => {
        return ["limpieza-profunda", "mantenimiento", "lavanderia"].includes(category)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-indigo-primary text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Servicios IndiGO</h1>
                        <p className="text-lg text-indigo-text/80 max-w-2xl mx-auto">
                            Asesorías virtuales y servicios de limpieza para tu vida independiente en Nicaragua
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Premium Benefits Banner */}
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="bg-yellow-500 rounded-full p-2 mr-4">
                                <Percent className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-yellow-800">¡Usuarios Premium obtienen descuentos!</h3>
                                <p className="text-yellow-700 text-sm">
                                    Descuentos exclusivos en servicios de limpieza pagando en línea
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center text-yellow-600">
                            <CreditCard className="h-5 w-5 mr-2" />
                            <span className="text-sm font-medium">Solo pago online</span>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Buscar servicios..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-secondary focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                    selectedCategory === category.id
                                        ? "bg-indigo-secondary text-white"
                                        : `${category.color} text-gray-700 hover:bg-gray-100 border border-gray-300`
                                }`}
                            >
                                <span className="mr-2">{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredServices.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            <div className="relative">
                                <img
                                    src={service.image || "/placeholder.svg"}
                                    alt={service.name}
                                    className="w-full h-48 object-cover"
                                />
                                {service.isVirtual && (
                                    <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                                        <Video className="h-3 w-3 mr-1" />
                                        Virtual
                                    </div>
                                )}
                                {isCleaningService(service.category) && (
                                    <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                        Precio por profesional
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-indigo-secondary font-medium flex items-center">
                    <span className="mr-1">{getServiceIcon(service.category, service.subcategory)}</span>
                      {service.category === "asesoria-virtual" && "Asesoría Virtual"}
                      {service.category === "limpieza-profunda" && "Limpieza Profunda"}
                      {service.category === "mantenimiento" && "Mantenimiento"}
                      {service.category === "lavanderia" && "Lavandería"}
                  </span>
                                    <div className="flex items-center">
                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                        <span className="text-sm text-gray-600 ml-1">{service.rating}</span>
                                    </div>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Clock className="h-4 w-4 mr-2" />
                                        {service.duration}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        {service.isVirtual ? <Video className="h-4 w-4 mr-2" /> : <MapPin className="h-4 w-4 mr-2" />}
                                        {service.location}
                                    </div>
                                    {service.professionalCount && (
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Users className="h-4 w-4 mr-2" />
                                            {service.professionalCount} profesionales disponibles
                                        </div>
                                    )}
                                </div>

                                {/* Features */}
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-1">
                                        {service.features.slice(0, 2).map((feature, index) => (
                                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                        {feature}
                                      </span>
                                        ))}
                                        {service.features.length > 2 && (
                                            <span className="text-xs text-gray-500">+{service.features.length - 2} más</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                        {isCleaningService(service.category) ? (
                                            <span className="flex items-center">
                                        <span className="text-indigo-primary font-medium">Precio por cotizar</span>
                                      </span>
                                        ) : (
                                            <span className="text-indigo-primary font-medium">Precio fijo</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => router.push("/dashboard")}
                                        className="bg-indigo-secondary hover:bg-indigo-secondary/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                                    >
                                        Solicitar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredServices.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron servicios</h3>
                        <p className="text-gray-600">Intenta con otros términos de búsqueda o categorías.</p>
                    </div>
                )}

                {/* How it Works Section */}
                <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Cómo funciona?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Conectamos usuarios con profesionales verificados en Nicaragua
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Search className="h-8 w-8 text-indigo-secondary" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">1. Solicita</h3>
                            <p className="text-gray-600 text-sm">Describe el servicio que necesitas</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-indigo-secondary" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">2. Recibe Ofertas</h3>
                            <p className="text-gray-600 text-sm">Los profesionales te envían sus cotizaciones</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <CreditCard className="h-8 w-8 text-indigo-secondary" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">3. Paga Seguro</h3>
                            <p className="text-gray-600 text-sm">Pago protegido por la plataforma</p>
                        </div>

                        <div className="text-center">
                            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="h-8 w-8 text-indigo-secondary" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">4. Disfruta</h3>
                            <p className="text-gray-600 text-sm">Recibe el servicio y califica</p>
                        </div>
                    </div>
                </div>

                {/* Payment Methods Info */}
                <div className="mt-8 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6">
                    <div className="text-center">
                        <h3 className="font-bold text-indigo-primary mb-2">Métodos de Pago</h3>
                        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <CreditCard className="h-4 w-4 mr-1" />
                Pago en línea (Premium con descuento)
              </span>
                            <span className="flex items-center">💵 Pago en efectivo al profesional</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
