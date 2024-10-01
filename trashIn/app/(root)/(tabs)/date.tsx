import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import React from 'react'
import { View ,Text} from 'react-native'

export default function date() {
  return (
    <View>
        <Text>All tracks screen</Text>
        <CustomButton
          title={"move"}
          onPress={() =>
               router.replace("/(tabs)/passages")
          }
          className="w-11/12 mt-10"
        />
      
    </View>
  )
}
