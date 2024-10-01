import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import React from 'react'
import { View,Text } from 'react-native'

export default function tripDetail() {
  return (
    <View>
    <Text>Trip details</Text>
    <CustomButton
      title={"Continue"}
      onPress={() =>
           router.replace("/(tabs)/summary")
      }
      className="w-11/12 mt-10"
    />
  
</View>
  )
}
