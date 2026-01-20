import { createContext } from "react";


export type AuthContextData = {
  token: string | null | undefined
  isLoading: boolean
  error: boolean,
  login: (username: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}


export const AuthContext = createContext<AuthContextData>({} as AuthContextData)