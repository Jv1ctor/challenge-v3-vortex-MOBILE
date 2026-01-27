import { Platform } from "react-native"


export const isDevelopment = __DEV__

export const getApiBaseUrl = (): string => {
  if(isDevelopment) {
    if(Platform.OS === "android"){
      return 'https://api-production-c8ec.up.railway.app'
    }

    return 'http://localhost:4000'
  }

  return "https://api-production-c8ec.up.railway.app"
}