import { Redirect } from "expo-router";

// Start on the Login screen.
export default function Index() {
  return <Redirect href="/login" />;
}
