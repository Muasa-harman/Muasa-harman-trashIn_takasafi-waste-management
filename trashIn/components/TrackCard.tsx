import { Image, Text, View } from "react-native";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Track } from "@/types/type";

const TrackCard = ({ track }: { track: Track }) => {
  return (
    <View className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className="flex flex-col items-start justify-center p-3">
        <View className="flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />

          <View className="flex flex-col mx-5 gap-y-5 flex-1">
            <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.to} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {track.origin_address}
              </Text>
            </View>

            {/* <View className="flex flex-row items-center gap-x-2">
              <Image source={icons.point} className="w-5 h-5" />
              <Text className="text-md font-JakartaMedium" numberOfLines={1}>
                {ride.destination_address}
              </Text>
            </View> */}
          </View>
        </View>

        <View className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Date & Time
            </Text>
            <Text className="text-md font-JakartaBold" numberOfLines={1}>
              {formatDate(track.created_at)}, {formatTime(track.ride_time)}
            </Text>
          </View>

          <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Driver
            </Text>
            <Text className="text-md font-JakartaBold">
              {track.driver.first_name} {track.driver.last_name}
            </Text>
          </View>

          {/* <View className="flex flex-row items-center w-full justify-between mb-5">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Car Seats
            </Text>
            <Text className="text-md font-JakartaBold">
              {ride.driver.car_seats}
            </Text>
          </View> */}

          <View className="flex flex-row items-center w-full justify-between">
            <Text className="text-md font-JakartaMedium text-gray-500">
              Payment Status
            </Text>
            <Text
              className={`text-md capitalize font-JakartaBold ${ride.payment_status === "paid" ? "text-green-500" : "text-red-500"}`}
            >
              {track.payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TrackCard;