import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/auth.hook";
import { Redirect } from "expo-router"





export default function Index(){
  const { token, isLoading } = useAuth() 

    if (isLoading) {
        return <Spinner />
    }

  if(token){
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/Login" />;
}