import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import React from 'react'
import { View,Text } from 'react-native'

export default function summary() {
  return (
    <View>
        <Text>Track Summary</Text>
        <CustomButton
          title={"move"}
          onPress={() =>
               router.replace("/(tabs)/check-out")
          }
          className="w-11/12 mt-10"
        />
      
    </View>
  )
}
