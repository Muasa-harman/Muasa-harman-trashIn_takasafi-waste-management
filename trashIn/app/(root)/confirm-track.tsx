import { router } from "expo-router";
import { FlatList, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import DriverCard from "@/components/DriverCard";
import TrackLayout from "@/components/TrackLayout";
import { useDriverStore } from "@/store";

const ConfirmTrack = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <TrackLayout title={"Choose a Track"} snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(item.id!)}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Track"
              onPress={() => router.push("/(root)/book-track")}
            />
          </View>
        )}
      />
    </TrackLayout>
  );
};

export default ConfirmTrack;
