import React from 'react'
import { Text, View,StyleSheet } from 'react-native'




export default function ScreenComponents({title,}:{title:string}) {
  return (
    <View>
      <View className='w-60 h-60 bg-green-700 justify-center items-center'>
      <Text className='text-white'>{title}</Text>
      </View>
    </View>
  )
}
