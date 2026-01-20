import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native"

type InputPasswordProps = {
  label: string,
  placeholder: string,
  value: string,
  onChangeValue: (text: string) => void
}& TextInputProps

export const InputPassword = (props: InputPasswordProps) => {
  const [focus, setFocus] = useState(false)
  const [hiddenPass, setHiddenPass] = useState(true)
  const { label, placeholder, value, onChangeValue} = props
  return(
    <View>
      <Text className="text-lg pb-2 flex-shrink">{label}:</Text>

      <View className={`bg-input flex-row items-center justify-between rounded-md ${focus ? "border-2 border-ring" : "border border-border"} ${props.className}`}>
        <TextInput 
          {...props}
          className={`bg-transparent px-4 w-full text-lg max-w-xs`} 
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeValue}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          secureTextEntry={hiddenPass}
          />

         <Pressable className="absolute right-4 py-3" onPress={() => setHiddenPass(!hiddenPass)}>
            {hiddenPass ? (
              <Ionicons name="eye-off-sharp" size={24} color={"#3f3f46"}/>
            ) : (
              <Ionicons name="eye-sharp" size={24} color={"#3f3f46"}/>
            )}
        </Pressable> 
      </View>
    </View>          
  )
}