import { User } from "@/types/User.type";
import { createContext } from "react";


export type AuthContextData = {
  token: string | null | undefined
  isLoading: boolean,
  user: User | null,
  error: boolean,
  login: (username: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}


export const AuthContext = createContext<AuthContextData>({} as AuthContextData)