interface BlogPost {
    title: string
    excerpt: string
    date: string
    image: string
    category: string
}

export const blogPosts: BlogPost[] = [
    {
        title: "Cómo ahorrar córdobas viviendo solo en Managua",
        excerpt: "Estrategias prácticas para reducir gastos en la capital nicaragüense sin sacrificar tu calidad de vida.",
        date: "15 Mar 2024",
        image: "/home/finanzas.jpg",
        category: "Finanzas",
    },
    {
        title: "Recetas nicaragüenses fáciles para estudiantes",
        excerpt: "Aprende a preparar gallo pinto, fritanga, maduro con queso y otros platos tradicionales con ingredientes accesibles.",
        date: "12 Mar 2024",
        image:"/home/gallopinto.jpg",
        category: "Cocina",
    },
    {
        title: "Guía de trámites para jóvenes independientes en Nicaragua",
        excerpt: "Todo lo que necesitas saber sobre documentos, INSS, y trámites gubernamentales esenciales.",
        date: "10 Mar 2024",
        image: "/home/inss.jpg",
        category: "Trámites",
    },
]
