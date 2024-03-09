import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context"


import Home from './src/pages/Home';
import DetalhesCliente from './src/pages/DetalhesCliente';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
          name = 'Home'
          component = {Home}
          />

          <Stack.Screen
            name='DetalhesCliente'
            component = {DetalhesCliente}
            />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

});
