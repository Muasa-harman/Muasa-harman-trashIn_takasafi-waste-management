import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="find-ride" options={{ headerShown: false }} />
      <Stack.Screen
        name="confirm-track"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="book-track"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
