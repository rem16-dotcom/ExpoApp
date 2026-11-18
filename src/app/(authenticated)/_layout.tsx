import { Stack } from "expo-router";
import { useTheme } from "@/src/context/theme";

export default function DefaultLayout() {
  const { c } = useTheme();
  return (
   <Stack screenOptions={{
    headerShown: false,
    contentStyle: { backgroundColor: c.bg }
   }}/>
  )
}
