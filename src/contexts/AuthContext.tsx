"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
    type User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    linkWithCredential,
    fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/clientApp";
import type {
    UserProfile,
    UserType,
} from "@/types/BaseUserProfile";
import { FirebaseError } from "@firebase/app";
import type { AuthUser } from "@/types/AuthUser";
import {EstudianteProfile} from "@/types/EstudianteProfile";
import {ProfesionalProfile} from "@/types/ProfesionalProfile";

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    needsProfileCompletion: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    loginWithGoogle: () => Promise<{ needsCompletion: boolean }>;
    completeProfile: (userData: CompleteProfileData) => Promise<void>;
    logout: () => Promise<void>;
    getUserProfile: () => Promise<UserProfile | null>;
}

interface RegisterData {
    email: string;
    password: string;
    displayName: string;
    cedula: string;
    telefono: string;
    direccion: string;
    nacionalidad: string;
    edad: number;
    genero: "masculino" | "femenino" | "otro";
    userType: UserType;
}

interface CompleteProfileData {
    cedula: string;
    telefono: string;
    direccion: string;
    nacionalidad: string;
    edad: number;
    genero: "masculino" | "femenino" | "otro";
    userType: UserType;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [needsProfileCompletion, setNeedsProfileCompletion] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (fu) => {
            if (fu) {
                const profile = await getUserProfileFromFirestore(fu.uid);
                setUser({ uid: fu.uid, email: fu.email, displayName: fu.displayName, profile: profile! });
                setNeedsProfileCompletion(!profile);
            } else {
                setUser(null);
                setNeedsProfileCompletion(false);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const getUserProfileFromFirestore = async (
        uid: string
    ): Promise<UserProfile | undefined> => {
        try {
            const snap = await getDoc(doc(db, "users", uid));
            return snap.exists() ? (snap.data() as UserProfile) : undefined;
        } catch {
            return undefined;
        }
    };

    const createUserProfile = async (
        u: User,
        data: Omit<RegisterData, "email" | "password">
    ): Promise<UserProfile> => {
        const now = Timestamp.now();
        let profile: UserProfile;
        if (data.userType === "estudiante") {
            profile = {
                uid: u.uid,
                email: u.email!,
                displayName: data.displayName,
                cedula: data.cedula,
                telefono: data.telefono,
                direccion: data.direccion,
                nacionalidad: data.nacionalidad,
                edad: data.edad,
                genero: data.genero,
                userType: "estudiante",
                plan: "gratuito",
                planSince: now,
                paymentMethods: [],
                descuentosActivos: false,
                createdAt: now,
                updatedAt: now,
            } as EstudianteProfile;
        } else {
            profile = {
                uid: u.uid,
                email: u.email!,
                displayName: data.displayName,
                cedula: data.cedula,
                telefono: data.telefono,
                direccion: data.direccion,
                nacionalidad: data.nacionalidad,
                edad: data.edad,
                genero: data.genero,
                userType: "profesional",
                calificacionPromedio: 0,
                trabajosRealizados: 0,
                fechaIngreso: now,
                zonasPreferidas: [],
                aceptaMaterialesPropios: false,
                aceptaTransporte: false,
                descripcionProfesional: "",
                createdAt: now,
                updatedAt: now,
            } as ProfesionalProfile;
        }
        await setDoc(doc(db, "users", u.uid), profile);
        return profile;
    };

    const createCompleteProfile = async (
        u: User,
        data: CompleteProfileData
    ): Promise<UserProfile> => {
        // Mismo flujo que createUserProfile, quizá actualizar updatedAt y campos editables
        const existing = await getUserProfileFromFirestore(u.uid);
        const now = Timestamp.now();

        if (!existing) throw new Error("Perfil no encontrado");

        if (existing.userType === "estudiante") {
            const upd = { ...existing, ...data, updatedAt: now } as EstudianteProfile;
            await setDoc(doc(db, "users", u.uid), upd);
            return upd;
        } else {
            const upd = { ...existing, ...data, updatedAt: now } as ProfesionalProfile;
            await setDoc(doc(db, "users", u.uid), upd);
            return upd;
        }
    };

    const login = async (email: string, pw: string): Promise<void> => {
        await signInWithEmailAndPassword(auth, email, pw);
    };

    const register = async (ud: RegisterData) => {
        const cred = await createUserWithEmailAndPassword(auth, ud.email, ud.password);
        await updateProfile(cred.user, { displayName: ud.displayName });
        const prof = await createUserProfile(cred.user, ud);
        setUser({ uid: cred.user.uid, email: cred.user.email, displayName: ud.displayName, profile: prof });
        setNeedsProfileCompletion(false);
    };

    const loginWithGoogle = async (): Promise<{ needsCompletion: boolean }> => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            let profile = await getUserProfileFromFirestore(user.uid);

            if (!profile) {
                // Crear perfil mínimo por defecto como estudiante
                profile = {
                    uid: user.uid,
                    email: user.email!,
                    displayName: user.displayName || "Nuevo usuario",
                    cedula: "",
                    telefono: "",
                    direccion: "",
                    nacionalidad: "",
                    edad: 0,
                    genero: "otro",
                    userType: "estudiante",
                    plan: "gratuito",
                    planSince: Timestamp.now(),
                    paymentMethods: [],
                    descuentosActivos: false,
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now(),
                } as EstudianteProfile;

                await setDoc(doc(db, "users", user.uid), profile);
            }

            setNeedsProfileCompletion(!profile || !profile.cedula); // o la lógica que necesites
            setUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                profile,
            });

            return { needsCompletion: !profile.cedula }; // o la condición que determines
        } catch (e: unknown) {
            if (
                e instanceof FirebaseError &&
                e.code === "auth/account-exists-with-different-credential"
            ) {
                const email = e.customData?.email as string;
                const pending = GoogleAuthProvider.credentialFromError(e);
                const methods = await fetchSignInMethodsForEmail(auth, email);
                if (methods.includes("password")) {
                    const pw = window.prompt("Ingresa tu contraseña para vincular cuentas:");
                    if (!pw) throw new Error("Contraseña requerida");
                    const userCred = await signInWithEmailAndPassword(auth, email, pw);
                    if (pending) await linkWithCredential(userCred.user, pending);
                    const prof = await getUserProfileFromFirestore(userCred.user.uid);
                    setNeedsProfileCompletion(!prof);
                    return { needsCompletion: !prof };
                }
            }
            throw e;
        }
    };

    const completeProfile = (data: CompleteProfileData) =>
        auth.currentUser
            ? createCompleteProfile(auth.currentUser, data).then((prof) => {
                setUser((u) => (u ? { ...u, profile: prof } : u));
                setNeedsProfileCompletion(false);
            })
            : Promise.reject(new Error("No authenticated user"));

    const logout = () =>
        signOut(auth).then(() => {
            setNeedsProfileCompletion(false);
        });

    const getUserProfile = async (): Promise<UserProfile | null> => {
        if (!user) return null;
        const profile = await getUserProfileFromFirestore(user.uid);
        return profile ?? null;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                needsProfileCompletion,
                login,
                register,
                loginWithGoogle,
                completeProfile,
                logout,
                getUserProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
