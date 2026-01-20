import { LoginForm } from "@/components/LoginForm"
import { Text, View } from "react-native"

export default function Login(){
  return(
    <View className="flex-1 items-center mt-56 p-5">
      <View className="shadow-lg max-w-md w-full rounded-md p-8 py-20 bg-card">
        <Text className="w-full text-foreground flex-wrap text-3xl font-medium mb-1">
          Login
        </Text>
        <Text className="text-accentForeground text-base mb-6">Realize o Login para acessar o aplicativo</Text>
        
        <LoginForm/>

      </View>

    </View>
  )
}