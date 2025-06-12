import Image from "next/image"
import { Calendar, ArrowRight, Crown } from "lucide-react"
import type {BaseUserProfile, UserProfile} from "@/types/BaseUserProfile"
import {EstudianteProfile} from "@/types/EstudianteProfile";


interface BlogPost {
    id: string
    title: string
    excerpt: string
    date: string
    image: string
    category: string
    isPremium: boolean
}

interface BlogPostCardProps {
    post: BlogPost
    userProfile: BaseUserProfile | UserProfile | undefined
}

export default function BlogPostCard({ post, userProfile }: BlogPostCardProps) {
    // Check if the user is an 'estudiante' and if their plan is 'premium'
    const isUserPremium = userProfile?.userType === "estudiante" && (userProfile as EstudianteProfile).plan === "premium"

    const canAccess = !post.isPremium || isUserPremium

    return (
        <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative flex flex-col h-full">
            <div className="relative">
                <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={300}
                    height={200}
                    className="w-full h-40 sm:h-48 object-cover"
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <span className="bg-indigo-secondary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
            {post.category}
          </span>
                </div>
                {post.isPremium && (
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center">
                        <Crown className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Premium
                    </div>
                )}
            </div>

            <div className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    {post.date}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-indigo-primary mb-2 sm:mb-3 line-clamp-2">{post.title}</h3>

                <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base flex-1">{post.excerpt}</p>

                {canAccess ? (
                    <div className="mt-auto">
                        <button className="text-indigo-secondary hover:text-indigo-secondary/80 flex items-center font-medium transition-colors duration-200 text-sm sm:text-base">
                            Leer más
                            <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                    </div>
                ) : (
                    <div className="text-center mt-auto">
                        <p className="text-sm text-yellow-700 mb-2">Contenido exclusivo para usuarios Premium.</p>
                        <a
                            href="/payment?plan=premium"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors inline-block"
                        >
                            Hazte Premium
                        </a>
                    </div>
                )}
            </div>
        </article>
    )
}
