import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import React from 'react'
import { View,Text } from 'react-native'

export default function trips() {
  return (
    <View>
        <Text>tracks</Text>
        <CustomButton
          title={"Confirm"}
          onPress={() =>
               router.replace("/(tabs)/tripDetail")
          }
          className="w-11/12 mt-10"
        />
        </View>
  )
}
