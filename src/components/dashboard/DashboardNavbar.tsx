"use client"

import { useState } from "react"
import Image from "next/image"
import {Menu, X, User, Settings, LogOut, Home, Briefcase, DollarSign, BookOpen, Tag} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter, usePathname } from "next/navigation"

export default function DashboardNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { user, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    const navLinks = [
        { href: "/dashboard", label: "Inicio", icon: Home, roles: ["estudiante"] },
        { href: "/dashboard/profesional", label: "Mi Trabajo", icon: Briefcase, roles: ["profesional"] },
        { href: "/dashboard/profesional/ofertas", label: "Ofertas", icon: Tag  , roles: ["profesional"] },
        { href: "/dashboard/servicios/solicitudes", label: "Servicios", icon: DollarSign, roles: ["estudiante"] },
        { href: "/dashboard/blog", label: "Blog", icon: BookOpen, roles: ["estudiante"] },
    ]

    const filteredNavLinks = navLinks.filter((link) => {
        if (!user?.profile?.userType) return false // If user type is not defined, hide link
        return link.roles.includes(user.profile.userType)
    })

    const handleLogout = async () => {
        await logout()
        router.push("/login")
    }

    return (
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex items-center space-x-2">
                            <Image
                                src="/logos/logocompletoazulpng.png"
                                alt="Isotipo IndiGO"
                                width={120}
                                height={120}
                            />
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6 lg:space-x-8">
                            {filteredNavLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`text-gray-700 hover:text-indigo-secondary transition-colors duration-200 px-3 py-2 text-sm font-medium flex items-center ${
                                        pathname === link.href ? "text-indigo-secondary font-semibold" : ""
                                    }`}
                                >
                                    <link.icon className="h-4 w-4 mr-2" />
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* User Dropdown / Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        {/* User Dropdown (Desktop) */}
                        <div className="hidden md:block relative group">
                            <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-secondary transition-colors">
                                <User className="h-5 w-5" />
                                <span className="font-medium">{user?.profile?.displayName || user?.email}</span>
                            </button>
                            <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                                <a
                                    href={user?.profile?.userType === "profesional" ? "/dashboard/profesional/profile" : "/dashboard/profile"}
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                    <User className="h-4 w-4 mr-2" />
                                    Mi Perfil
                                </a>
                                <a
                                    href="/dashboard/settings"
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                >
                                    <Settings className="h-4 w-4 mr-2" />
                                    Configuración
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-gray-900 p-2">
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-2">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {filteredNavLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={` px-3 py-2 rounded-md text-base font-medium flex items-center ${
                                        pathname === link.href
                                            ? "bg-indigo-100 text-indigo-secondary"
                                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <link.icon className="h-5 w-5 mr-3" />
                                    {link.label}
                                </a>
                            ))}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <User className="h-8 w-8 text-gray-500" />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">{user?.profile?.displayName || user?.email}</div>
                                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                                </div>
                            </div>
                            <div className="mt-3 px-2 space-y-1">
                                <a
                                    href={user?.profile?.userType === "profesional" ? "/dashboard/profesional/profile" : "/dashboard/profile"}
                                    className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 flex items-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <User className="h-5 w-5 mr-3" />
                                    Mi Perfil
                                </a>
                                <a
                                    href="/dashboard/settings"
                                    className=" px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 flex items-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Settings className="h-5 w-5 mr-3" />
                                    Configuración
                                </a>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 flex items-center"
                                >
                                    <LogOut className="h-5 w-5 mr-3" />
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
