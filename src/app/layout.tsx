import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import {AuthProvider} from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "IndiGO - Tu independencia comienza aquí en Nicaragua",
    description:
        "IndiGO es la plataforma pensada para estudiantes y jóvenes profesionales en Nicaragua que buscan vivir de forma independiente. Accede a servicios de limpieza, asesorías y herramientas para manejar tus finanzas y trámites del día a día.",
    keywords:
        "vida independiente, estudiantes Nicaragua, jóvenes profesionales Nicaragua, servicios, limpieza, asesorías, finanzas, trámites, vivir solo",
    authors: [{ name: "IndiGO Team Nicaragua" }],
    openGraph: {
        title: "IndiGO - Tu independencia comienza aquí en Nicaragua",
        description:
            "Plataforma nicaragüense para estudiantes y jóvenes que quieren vivir de forma independiente con servicios y recursos prácticos.",
        type: "website",
        locale: "es_NI",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
        <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
        </body>
        </html>
    )
}

