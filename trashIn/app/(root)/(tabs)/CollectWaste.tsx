import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "@/components/Map";
// import {Map} 

import { icons, images } from "@/constants";
import GoogleTextInput from "@/components/GoogleTextInput";
import { useLocationStore } from "@/store";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

const CollectWaste = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* <Text className="text-2xl font-JakartaBold">Chat</Text> */}
        <View className="flex-1 h-fit flex justify-center items-center">
        <Text className="text-xl font-JakartaBold mt-5 mb-3">
                {/* Your current location */}
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
              <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>

        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <CustomButton
        title="Find Track Now"
        onPress={() => router.push(`/(root)/confirm-ride`)}
        className="mt-5"
      />
          <Text className="text-base mt-2 text-center px-7">
            Start a conversation with your friends and family
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CollectWaste;