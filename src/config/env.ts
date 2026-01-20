import { Platform } from "react-native"


export const isDevelopment = __DEV__

export const getApiBaseUrl = (): string => {
  if(isDevelopment) {
    if(Platform.OS === "android"){
      return 'http://10.0.2.2:4000'
    }

    return 'http://localhost:4000'
  }

  return "https://procution-api.com"
}