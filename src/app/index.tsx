import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/auth.hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router"



export default function Index(){
  const { user, isLoading } = useAuth()
  
  AsyncStorage.getItem("user").then((data) => {
    console.log("user:", data)
  })

  AsyncStorage.getAllKeys().then(console.log)
  // AsyncStorage.removeItem("user")
  
  if (isLoading) {
      return <Spinner />
  }

  if(user && user.id && user.factoryId){
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/Login" />;
}