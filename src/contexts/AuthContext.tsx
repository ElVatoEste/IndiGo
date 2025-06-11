"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
    type User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
} from "firebase/auth"
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore"
import { auth, db } from "@/firebase/clientApp"
import type { AuthUser, UserProfile, UserType } from "@/types/user"

interface AuthContextType {
    user: AuthUser | null
    loading: boolean
    needsProfileCompletion: boolean
    login: (email: string, password: string) => Promise<void>
    register: (userData: RegisterData) => Promise<void>
    loginWithGoogle: () => Promise<{ needsCompletion: boolean }>
    completeProfile: (userData: CompleteProfileData) => Promise<void>
    logout: () => Promise<void>
    getUserProfile: () => Promise<UserProfile | null>
}

interface RegisterData {
    email: string
    password: string
    displayName: string
    cedula: string
    telefono: string
    direccion: string
    nacionalidad: string
    edad: number
    genero: "masculino" | "femenino" | "otro"
    userType: UserType
}

interface CompleteProfileData {
    cedula: string
    telefono: string
    direccion: string
    nacionalidad: string
    edad: number
    genero: "masculino" | "femenino" | "otro"
    userType: UserType
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [needsProfileCompletion, setNeedsProfileCompletion] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Get user profile from Firestore
                const profile = await getUserProfileFromFirestore(firebaseUser.uid)

                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    profile,
                })

                // Check if profile is incomplete
                setNeedsProfileCompletion(!profile)
            } else {
                setUser(null)
                setNeedsProfileCompletion(false)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const getUserProfileFromFirestore = async (uid: string): Promise<UserProfile | undefined> => {
        try {
            const userDoc = await getDoc(doc(db, "users", uid))
            if (userDoc.exists()) {
                return userDoc.data() as UserProfile
            }
        } catch (error) {
            console.error("Error getting user profile:", error)
        }
        return undefined
    }

    const createUserProfile = async (firebaseUser: User, userData: Omit<RegisterData, "email" | "password">) => {
        const userProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: userData.displayName,
            cedula: userData.cedula,
            telefono: userData.telefono,
            direccion: userData.direccion,
            nacionalidad: userData.nacionalidad,
            edad: userData.edad,
            genero: userData.genero,
            userType: userData.userType,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        }

        await setDoc(doc(db, "users", firebaseUser.uid), userProfile)
        return userProfile
    }

    const createCompleteProfile = async (firebaseUser: User, userData: CompleteProfileData) => {
        const userProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName || "Usuario",
            cedula: userData.cedula,
            telefono: userData.telefono,
            direccion: userData.direccion,
            nacionalidad: userData.nacionalidad,
            edad: userData.edad,
            genero: userData.genero,
            userType: userData.userType,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        }

        await setDoc(doc(db, "users", firebaseUser.uid), userProfile)
        return userProfile
    }

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.error("Error logging in:", error)
            throw error
        }
    }

    const register = async (userData: RegisterData) => {
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)

            // Update the user's display name
            await updateProfile(userCredential.user, {
                displayName: userData.displayName,
            })

            // Create user profile in Firestore
            const profile = await createUserProfile(userCredential.user, userData)

            // Update local user state
            setUser({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userData.displayName,
                profile,
            })

            setNeedsProfileCompletion(false)
        } catch (error) {
            console.error("Error registering:", error)
            throw error
        }
    }

    const loginWithGoogle = async (): Promise<{ needsCompletion: boolean }> => {
        try {
            const provider = new GoogleAuthProvider()
            // Request additional scopes for more user information
            provider.addScope('profile')
            provider.addScope('email')

            const result = await signInWithPopup(auth, provider)

            // Check if user profile exists in Firestore
            const existingProfile = await getUserProfileFromFirestore(result.user.uid)

            if (!existingProfile) {
                // User needs to complete their profile
                setNeedsProfileCompletion(true)
                return { needsCompletion: true }
            } else {
                setNeedsProfileCompletion(false)
                return { needsCompletion: false }
            }
        } catch (error) {
            console.error("Error logging in with Google:", error)
            throw error
        }
    }

    const completeProfile = async (userData: CompleteProfileData) => {
        try {
            if (!auth.currentUser) {
                throw new Error("No authenticated user found")
            }

            // Create complete user profile in Firestore
            const profile = await createCompleteProfile(auth.currentUser, userData)

            // Update local user state
            setUser(prev => prev ? {
                ...prev,
                profile,
            } : null)

            setNeedsProfileCompletion(false)
        } catch (error) {
            console.error("Error completing profile:", error)
            throw error
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
            setNeedsProfileCompletion(false)
        } catch (error) {
            console.error("Error logging out:", error)
            throw error
        }
    }

    const getUserProfile = async (): Promise<UserProfile | null> => {
        if (!user) return null

        try {
            const userDoc = await getDoc(doc(db, "users", user.uid))
            if (userDoc.exists()) {
                return userDoc.data() as UserProfile
            }
        } catch (error) {
            console.error("Error getting user profile:", error)
        }
        return null
    }

    const value = {
        user,
        loading,
        needsProfileCompletion,
        login,
        register,
        loginWithGoogle,
        completeProfile,
        logout,
        getUserProfile,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
