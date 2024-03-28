import { NavigationContainer } from "@react-navigation/native";

import Routes from "./src/routes/index.js";

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
