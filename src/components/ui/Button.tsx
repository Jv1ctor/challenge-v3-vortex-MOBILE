import { ReactNode, useState } from "react"
import { Pressable, PressableProps, Text } from "react-native"


type ButtonProps = {
  children: ReactNode,
  onClick: () => void
} & PressableProps

export const Button = ( props: ButtonProps ) => {
  const { children, onClick } = props

  const handleClick = () => {
    onClick()
  }

  return(
    <Pressable
    onPress={handleClick}
    className={`bg-primary px-4 py-2 rounded-md active:opacity-75 ${props.className}`}
    >
    <Text className="text-primaryForeground text-center text-lg font-medium">
      {children}
    </Text>
    </Pressable>
  )
}