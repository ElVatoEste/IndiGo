"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import BlogPostCard from "@/components/dashboard/blog/BlogPostCard";

interface BlogPost {
    id: string
    title: string
    excerpt: string
    date: string
    image: string
    category: string
    isPremium: boolean
}

const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "Cómo ahorrar córdobas viviendo solo en Managua",
        excerpt: "Estrategias prácticas para reducir gastos en la capital nicaragüense sin sacrificar tu calidad de vida.",
        date: "15 Mar 2024",
        image: "/servicios/asesoriaFinanciera.jpg",
        category: "Finanzas",
        isPremium: false,
    },
    {
        id: "2",
        title: "Recetas nicaragüenses fáciles para estudiantes",
        excerpt: "Aprende a preparar gallo pinto, nacatamales y otros platos tradicionales con ingredientes accesibles.",
        date: "12 Mar 2024",
        image: "/servicios/coRapidas.jpg",
        category: "Cocina",
        isPremium: false,
    },
    {
        id: "3",
        title: "Guía de trámites para jóvenes independientes en Nicaragua",
        excerpt: "Todo lo que necesitas saber sobre documentos, INSS, y trámites gubernamentales esenciales.",
        date: "10 Mar 2024",
        image: "/servicios/inss.jpg",
        category: "Trámites",
        isPremium: false,
    },
    {
        id: "4",
        title: "Inversiones inteligentes para jóvenes en Nicaragua",
        excerpt: "Descubre cómo hacer crecer tu dinero con opciones de inversión adaptadas al mercado nicaragüense.",
        date: "05 Abr 2024",
        image: "/servicios/inv3.jpg",
        category: "Finanzas",
        isPremium: true, // Premium content
    },
    {
        id: "5",
        title: "Secretos de la limpieza profunda profesional",
        excerpt: "Técnicas y productos que usan los expertos para dejar tu hogar impecable.",
        date: "20 Abr 2024",
        image: "/servicios/waaa5.jpeg",
        category: "Limpieza",
        isPremium: true, // Premium content
    },
    {
        id: "6",
        title: "Cómo negociar contratos de alquiler en Managua",
        excerpt: "Consejos legales y prácticos para asegurar el mejor trato en tu vivienda.",
        date: "01 May 2024",
        image: "/servicios/contrato.jpg",
        category: "Legal",
        isPremium: true, // Premium content
    },
]

export default function BlogPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="min-h-screen bg-indigo-primary flex items-center justify-center">
                <div className="text-indigo-text text-xl">Cargando...</div>
            </div>
        )
    }

    if (!user) {
        return null // Or a loading spinner, or redirect
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl font-bold text-indigo-primary mb-4">Blog de IndiGO</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Consejos, guías y recursos para tu vida independiente en Nicaragua.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {blogPosts.map((post) => (
                        <BlogPostCard key={post.id} post={post} userProfile={user.profile} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-600 text-sm">
                        ¿Quieres acceder a todo el contenido exclusivo?{" "}
                        <a href="/payment?plan=premium" className="text-indigo-secondary hover:underline font-medium">
                            Hazte Premium aquí
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
