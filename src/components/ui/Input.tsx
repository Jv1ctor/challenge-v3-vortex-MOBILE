import { useState } from "react"
import { Text, TextInput, TextInputProps, View } from "react-native"


type InputProps = {
  label: string,
  placeholder: string,
  value: string,
  onChangeValue: (text: string) => void
}& TextInputProps

export const Input = (props: InputProps) => {
  const [focus, setFocus] = useState(false)
  const { label, placeholder, value, onChangeValue} = props
  return(
    <View>
      <Text className="text-lg pb-2 flex-shrink">{label}:</Text>
      <TextInput 
        {...props}
        className={`bg-input text-lg rounded-md px-4 py-3 ${focus ? "border-2 border-ring" : "border border-border"} ${props.className}`} 
        placeholder={placeholder} 
        value={value}
        onChangeText={onChangeValue}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        />
    </View>          
  )
}