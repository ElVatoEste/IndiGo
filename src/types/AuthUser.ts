import {BaseUserProfile} from "@/types/BaseUserProfile";

export interface AuthUser {
    uid: string
    email: string | null
    displayName: string | null
    profile?: BaseUserProfile
}