import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import React from 'react'
import { View,Text } from 'react-native'

export default function checkout() {
  return (
    <View>
    <Text>You are about to pay</Text>
    <CustomButton
      title={"Pay Kshs."}
      onPress={() =>
           router.replace("/(tabs)/notification")
      }
      className="w-11/12 mt-10"
    />
  
</View>
  )
}
