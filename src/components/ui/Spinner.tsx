import { ActivityIndicator, View } from "react-native";

export const Spinner = ({ color, size = "large" }: { color?: string, size?: "large" | "small" }) => {

  return(
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size={size} color={color} />
       </View>
  )
}