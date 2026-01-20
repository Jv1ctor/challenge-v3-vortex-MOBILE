import { ReactNode, useState } from "react"
import { Pressable, PressableProps, Text } from "react-native"


type ButtonProps = {
  children: ReactNode,
  onClick: () => void
} & PressableProps

export const Button = ( props: ButtonProps ) => {
  const [pressed, setPressed] = useState(false)
  const { children, onClick } = props

  const handleClick = () => {
    setPressed(true)
    onClick()
  }
  
  const handleOutClick = () => {
    setPressed(false)
  }

  return(
    <Pressable
    onPress={handleClick}
    onPressOut={handleOutClick}
    className={`bg-primary px-4 py-2 rounded-md ${pressed ? "opacity-70" : ""} ${props.className}`}
    >
    <Text className="text-primaryForeground text-center text-lg font-medium">
      {children}
    </Text>
    </Pressable>
  )
}