import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import React from 'react'
import { View,Text } from 'react-native'

export default function notification() {
  return (
    <View>
    <Text>Booked a Collection Successfully</Text>
    <CustomButton
      title={"Book"}
      onPress={() =>
           router.replace("/(tabs)/date")
      }
      className="w-11/12 mt-10"
    />

<CustomButton
          title={"Back to home"}
          onPress={() => router.replace("/(tabs)/home")}
          className="w-11/12 mt-1 border-green-400"
          bgVariant="outline"
          textVariant="primary"
        />
  
</View>
  )
}
