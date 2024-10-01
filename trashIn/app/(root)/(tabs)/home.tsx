import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router, usePathname, useRouter } from "expo-router";
import { useState,useRef, useEffect } from "react";
import { icons } from "@/constants";
import {
  Text,
  View,
  TouchableOpacity,
  Animated
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { useFetch } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { Track } from "@/types/type";
import RideLayout from "@/components/TrackLayout";
// import Rides from "../../../components/tracks";
// import Tracks from "../../../components/tracks";
import ScreenComponents from "@/components/ScreenComponents";

const Home = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const { setUserLocation, setDestinationLocation } = useLocationStore();

  const fadeAnim1 = useRef(new Animated.Value(0)).current; // Initial opacity for the first component
  const fadeAnim2 = useRef(new Animated.Value(0)).current; // Initial opacity for the second component
  const fadeAnim3 = useRef(new Animated.Value(0)).current; // Initial opacity for the third component

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const {
    data: recentRides,
    loading,
    error,
  } = useFetch<Track[]>(`/(api)/ride/${user?.id}`);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);

    router.push("/(root)/find-ride");
  };


  // Start the animations when the component mounts
  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(fadeAnim1, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim3, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim1, fadeAnim2, fadeAnim3]);

  const handlePress = () => {
    router.replace({pathname:"/(root)/(tabs)/CollectWaste" as const}); 
  };

  return (
    <SafeAreaView>
      {/* {" "} */}
      {/* className="bg-general-500" */}
      <View className=" my-5 bg-white shadow-md shadow-neutral-300">
        <GoogleTextInput
          icon={icons.search}
          containerStyle="bg-white shadow-md shadow-neutral-300"
          handlePress={handleDestinationPress}
        />
      </View>
      <View>
        <Text className="text-center mt-5 text-2xl font-JakartaBold" >Please Choose a service to continue</Text>
        <View className="flex flex-row items-center justify-between my-5">
              {/* <Text className="text-2xl font-JakartaExtraBold"> */}
                {/* Welcome {user?.firstName}👋 */}
              {/* </Text> */}
              <TouchableOpacity
                onPress={handleSignOut}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Text>S O</Text>
              </TouchableOpacity>
            </View>
        <View className="flex-row justify-between mt-5">
          <View className="w-1/2 mr-2">
          <TouchableOpacity  onPress={() =>  //onPress={handlePress}
               router.replace("/(tabs)/CollectWaste")
          } accessible={true} accessibilityLabel="Collect Waste">
        <Animated.View style={[ { opacity: fadeAnim1 }]}>    
        <ScreenComponents title="Collect Waste"/>
        </Animated.View>
          </TouchableOpacity>
          </View>
          <View className="w-1/2 ml-2">
          <TouchableOpacity>
        <Animated.View style={[ { opacity: fadeAnim2 }]}>
        <ScreenComponents title="Report Waste"/>
        </Animated.View>
          </TouchableOpacity>
          </View>
        </View>
        <View className="flex justify-center items-center mt-5">
          <TouchableOpacity>
        <Animated.View style={[{ opacity: fadeAnim2 }]}>
        <ScreenComponents title="Rewards"/>
        </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
